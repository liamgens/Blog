import React, { Component } from 'react';
import './sidebar.css';
import PostForm from './PostForm.js';


class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        };
    }

    render() {

        return (
            <div id="newPost">
                <PostForm token={this.props.token} />
            </div>
        );
    }
}

export default NewPost;
