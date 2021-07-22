import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import AddBlog from "./components/add-blog.component";
import Blog from "./components/blog.component";
import BlogsList from "./components/blogs-list.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            News Posts
          </Link>
          {currentUser ? (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/blogs"} className="nav-link">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>):(
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )
          }
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/blogs"]} component={BlogsList} />
            <Route exact path="/create" component={AddBlog} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/blogs/:id" component={Blog} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);

