import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBlog, deleteBlog } from "../actions/blogs";
import BlogDataService from "../services/user.service";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBlog = this.getBlog.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeBlog = this.removeBlog.bind(this);

    this.state = {
      currentBlog: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getBlog(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBlog: {
          ...prevState.currentBlog,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentBlog: {
        ...prevState.currentBlog,
        description: description,
      },
    }));
  }

  getBlog(id) {
    BlogDataService.getSingleBlogPost(id)
      .then((response) => {
        this.setState({
          currentBlog: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentBlog.id,
      title: this.state.currentBlog.title,
      description: this.state.currentBlog.description,
      published: status,
    };

    this.props
      .updateBlog(this.state.currentBlog.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentBlog: {
            ...prevState.currentBlog,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateBlog(this.state.currentBlog.id, this.state.currentBlog)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The Blog was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeBlog() {
    this.props
      .deleteBlog(this.state.currentBlog.id)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBlog } = this.state;

    return (
        <div>
        {currentBlog ? (
          <div className="edit-form">
            <h4>Blog</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBlog.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBlog.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBlog.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentBlog.published ? (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-danger mr-2"
              onClick={this.removeBlog}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Blog...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateBlog, deleteBlog })(Blog);
