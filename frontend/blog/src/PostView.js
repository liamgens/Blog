import React, { Component } from 'react';
import './sidebar.css'
const ReactMarkdown = require('react-markdown')
// var md = require('markdown-string')



class PostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        post: [],
    };
}

  componentDidMount(){
    const { match: { params } } = this.props;
    const url = "http://localhost:5000/posts/" + params.id;

    fetch(url)
      .then(response => response.json())
      // .then(data => console.log(data));
      .then(data => this.setState({ post: data }));
  }

  render() {

    return (
        <div id="posts">
            <ReactMarkdown source={this.state.post.title}></ReactMarkdown>
            <ReactMarkdown source={this.state.post.content}></ReactMarkdown>
        </div> 
    );
  }
}

export default PostView;
