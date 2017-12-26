import React, { Component } from 'react';
import './sidebar.css'
import ImageUpload from './ImageUpload';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Button from './Button';
import FileInput from './FileInput';
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
                        <TextInput width="100%" height="auto" type="text" value={this.state.title} onChange={this.handleTitleChange} /><br />
                        <TextArea width="100%" type="text" value={this.state.content} onChange={this.handleContentChange} /><br />
                        <div>
                            <FileInput action={this.handleImageChange} />
                            <Button width="115px" type="submit" value="Post">Post</Button>
                        </div>
                        <img src={this.state.image_encoded} height="100%" width="100%" />
                    </form>
                </div>
                <div id="preview" className="wrap" >
                    <ReactMarkdown source={m_title}></ReactMarkdown>
                    <ReactMarkdown source={this.state.content}></ReactMarkdown>
                </div>
            </div>
        );
    }

}

export default PostForm;