import React, { Component } from 'react';
import logo from './logo.svg';
import Sidebar from './Sidebar.js';
import Posts from './Posts.js';
import { Switch, Route } from 'react-router-dom'
import PostPreview from './PostPreview';
import PostView from './PostView';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div>
        <Sidebar></Sidebar>
          <Route exact path='/' component={Posts}/>
          <Route path='/posts/:id' component={PostView}/>
      </div>
    </BrowserRouter>

    );
  }
}

export default App;
