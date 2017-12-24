import React, { Component } from 'react';
import './sidebar.css';
import PostForm from './PostForm.js';
const ReactMarkdown = require('react-markdown');
// var md = require('markdown-string')

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        };
    }

    render() {

        return (
            <div id="posts">
                <PostForm />
            </div>
        );
    }
}

export default NewPost;
