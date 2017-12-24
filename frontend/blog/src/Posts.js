import React, { Component } from 'react';
import PostPreview from './PostPreview.js';
import './sidebar.css';


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

    for (var i = this.state.posts.length - 1; i >= 0; i--) {
      posts.push(<PostPreview id={this.state.posts[i].id} title={this.state.posts[i].date_posted} image={this.state.posts[i].image_url}> </PostPreview>);
    }

    return (
      <div id="posts">
        {posts}
      </div>
    );
  }
}

export default Posts;
