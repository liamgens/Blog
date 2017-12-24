import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Posts from './Posts.js';
import { Switch, Route } from 'react-router-dom'
import PostPreview from './PostPreview';
import PostView from './PostView';
import { BrowserRouter } from 'react-router-dom'
import NewPost from './NewPost.js'
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Sidebar></Sidebar>
          <Switch>
            <Route exact path='/' component={Posts} />
            <Route path='/posts/new' component={NewPost} />
            <Route path='/posts/:id' component={PostView} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
