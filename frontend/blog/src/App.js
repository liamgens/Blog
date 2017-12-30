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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {
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
              <PrivateRoute path='/admin' component={NewPost} />
              <Route path="/login" component={Login} />
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
