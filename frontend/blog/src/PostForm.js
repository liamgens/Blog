import React, { Component } from 'react';
import './sidebar.css'
import ImageUpload from './ImageUpload';
const ReactMarkdown = require('react-markdown');


class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            file: '',
            image_encoded: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }

    handleContentChange(event) {
        this.setState({ content: event.target.value })
    }

    handleImageChange(event) {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = (readerEvt) => {
            var binaryString = readerEvt.target.result;

            this.setState({
                file: file,
                image_encoded: binaryString,
            });
        }

        reader.readAsDataURL(file)
    }

    handleSubmit(event) {
        var json = {
            title: this.state.title,
            content: this.state.content,
            image_url: this.state.image_encoded
        }

        const url = "http://localhost:5000/posts/new";

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'method': 'post',
            'body': JSON.stringify(json)
        })
            .then(response => console.log(response))

        event.preventDefault();
    }

    render() {

        var m_title = "# " + this.state.title;

        return (
            <div>
                <div id="edit">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange} /><br />
                        <textarea type="text" value={this.state.content} onChange={this.handleContentChange} /><br />
                        <input type="file" onChange={this.handleImageChange} />
                        <input type="submit" value="Post" />
                    </form>
                </div>
                <div id="preview">
                    <ReactMarkdown source={m_title}></ReactMarkdown>
                    <ReactMarkdown source={this.state.content}></ReactMarkdown>
                </div>
            </div>
        );
    }

}

export default PostForm;