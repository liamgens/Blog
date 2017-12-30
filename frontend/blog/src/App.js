import React, { Component } from 'react';
import Posts from './Posts.js';
import { Switch, Route } from 'react-router-dom'
import PostView from './PostView';
import { BrowserRouter } from 'react-router-dom'
import NewPost from './NewPost.js'
import NotFound from './NotFound';
import TopBar from './TopBar';
import './sidebar.css';


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
              <Route path='/admin' component={NewPost} />
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
