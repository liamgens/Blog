import React, { Component } from 'react';
import './sidebar.css'
const ReactMarkdown = require('react-markdown')
// var md = require('markdown-string')



class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
        content:"",
    };
}

  render() {

    return (
        <div id="posts">
            <form>
                <input type="text"/>
            </form>
        </div> 
    );
  }
}

export default NewPost;
