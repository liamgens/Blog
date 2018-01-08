import React, { Component } from 'react';
import './sidebar.css'
import ImageUpload from './ImageUpload';
import PostPreview from './PostPreview';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Button from './Button';
import FileInput from './FileInput';
import { withRouter } from "react-router-dom";
const ReactMarkdown = require('react-markdown');

const submit_style = {
    float: 'right',
}

const component_style = {
    marginBottom: "5px"
}

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            content: '',
            file: '',
            image_encoded: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value })
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
            description: this.state.description,
            content: this.state.content,
            image_url: this.state.image_encoded,
            token: this.props.token
        }

        const url = "http://localhost:5000/posts/new";

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'method': 'post',
            'body': JSON.stringify(json)
        }).then(response => response.json())
            .then(json => json)

        event.preventDefault();
    }

    render() {

        var m_title = "# " + this.state.title;

        return (
            <div>
                <div id="edit">
                    <form onSubmit={this.handleSubmit}>
                        <TextInput style={component_style} width="100%" height="auto" type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" /><br />
                        <TextArea style={component_style} height="50px" width="100%" type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" /><br />
                        <TextArea style={component_style} height="350px" width="100%" type="text" value={this.state.content} onChange={this.handleContentChange} placeholder="Content" /><br />
                        <div style={component_style}>
                            <FileInput action={this.handleImageChange}></FileInput>
                            <Button style={submit_style} width="115px" type="submit" value="Post" primary>Post</Button>
                        </div>
                        <PostPreview title={this.state.title} description={this.state.description} image={this.state.image_encoded} date={"Mon, 01 Jan 2018"}></PostPreview>
                    </form>
                </div>
                <div id="preview" className="wrap" >
                    <ReactMarkdown source={m_title}></ReactMarkdown>
                    <ReactMarkdown source={this.state.content}></ReactMarkdown>
                </div>
            </div >
        );
    }

}

export default PostForm;