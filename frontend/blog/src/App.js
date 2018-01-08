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
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get("token")
    }
    this.getLogin = this.getLogin.bind(this);
  }

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
      .then(json => {
        var token = json['token'];

        if (token != null) {
          this.setState({
            token: token
          })
          cookies.set('token', token, { path: '/' });
        }
      })
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
                this.state.token == null ?
                  <Login callback={this.getLogin} /> :
                  <NewPost token={this.state.token} />
              } />
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
