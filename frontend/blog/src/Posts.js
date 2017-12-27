import React, { Component } from 'react';
import PostPreview from './PostPreview.js';
import './sidebar.css';
import Sidebar from './Sidebar';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/posts")
      .then(response => response.json())
      .then(data => this.setState({ posts: data }));
  }

  render() {

    var posts = [];

    // Added the key prop - although might be a better approach
    for (var i = this.state.posts.length - 1; i >= 0; i--) {
      posts.push(<PostPreview key={this.state.posts[i].id} id={this.state.posts[i].id} title={this.state.posts[i].title} image={this.state.posts[i].image_url} date={this.state.posts[i].date_posted}> </PostPreview>);
    }

    return (
      <div>
        <div id="posts">
          {posts}
        </div>
      </div>
    );
  }
}

export default Posts;
