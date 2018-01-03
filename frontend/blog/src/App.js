import React, { Component } from 'react';
import Posts from './Posts.js';
import { Switch, Route, Redirect } from 'react-router-dom'
import PostView from './PostView';
import { BrowserRouter } from 'react-router-dom'
import NewPost from './NewPost.js'
import NotFound from './NotFound';
import TopBar from './TopBar';
import Login from './Login';
import './sidebar.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
    this.getLogin = this.getLogin.bind(this);
  }

  // TODO: Add in the request and pass the true false value
  getLogin(user, pass) {
    var json = {
      username: user,
      password: pass,
    }

    const url = "http://localhost:5000/login";

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'method': 'post',
      'body': JSON.stringify(json)
    })
      .then(data => data.json())
      .then(json => console.log(json))

    if (user == "test" && pass == "test") {
      this.setState({ isAuthenticated: !this.state.isAuthenticated });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="topBar">
            <TopBar></TopBar>
          </div>
          <div>
            <Switch>
              <Route exact path='/' component={Posts} />
              <Route path='/admin' render={() =>
                !this.state.isAuthenticated ?
                  <Login callback={this.getLogin} /> :
                  <NewPost />
              } />
              {/* <Route path="/login" component={Login} /> */}
              <Route path='/posts/:id' component={PostView} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
