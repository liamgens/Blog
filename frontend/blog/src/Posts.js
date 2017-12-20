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

  componentDidMount(){
    fetch("http://localhost:5000/posts")
      .then(response => response.json())
      .then(data => this.setState({ posts: data }));
  }

  render() {

    var posts = [];

    for(var i=0;i<this.state.posts.length;i++){
      posts.push(<PostPreview id={this.state.posts[i].id} title={this.state.posts[i].title} image="https://media.wired.com/photos/5a2eb8b77ddf3c6b8cc4157d/master/w_2264,c_limit/AI_VideoFinal.jpg"> </PostPreview>);
    }

    return (
        <div id="posts">
            {posts}
        </div> 
    );
  }
}

export default Posts;
