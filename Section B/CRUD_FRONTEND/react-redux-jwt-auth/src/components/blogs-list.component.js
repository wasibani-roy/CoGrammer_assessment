import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveBlogs, findBlogsByTitle} from "../actions/blogs";

class blogsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveblog = this.setActiveBlog.bind(this);
    this.findByTitle = this.findByTitle.bind(this);

    this.state = {
      currentBlog: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user.user
      });
    }
    this.props.retrieveBlogs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentBlog: null,
      currentIndex: -1,
    });
  }

  setActiveBlog(blog, index) {
    this.setState({
      currentBlog: blog,
      currentIndex: index,
    });
  }

  findByTitle() {
    this.refreshData();

    this.props.findBlogsByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentBlog, currentIndex, currentUser } = this.state;
    const { blogs } = this.props;
    // console.log(currentUser.id);
    return (
        <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Blogs List</h4>

          <ul className="list-group">
            {blogs &&
              blogs.map((blog, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBlog(blog, index)}
                  key={index}
                >
                  {blog.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentBlog ? (
            <div>
              <h4>Blog</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBlog.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBlog.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentBlog.published ? "Published" : "Pending"}
              </div>
            {currentUser && currentUser.id === currentBlog.userId && 
                <Link
                to={"/blogs/" + currentBlog.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            }
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Blog...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogReducer,
    user: state.auth
  };
};

export default connect(mapStateToProps, { retrieveBlogs, findBlogsByTitle })(blogsList);
