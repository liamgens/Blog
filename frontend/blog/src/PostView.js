import React, { Component } from 'react';
import './sidebar.css'
const ReactMarkdown = require('react-markdown')

const center = {
  textAlign: "center"
}

class PostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      title: ''
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const url = "http://localhost:5000/posts/" + params.id;

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ content: data.content, title: "# " + data.title }));
  }

  render() {

    // var m_title = "# " + this.state.post.title;

    return (
      <div>
        <div id="postView">
          <div style={center}>
            <ReactMarkdown className="noPaddingg" source={this.state.title}></ReactMarkdown>
          </div>
          <ReactMarkdown className="noPadding" source={this.state.content}></ReactMarkdown>
        </div>
      </div>

    );
  }
}

export default PostView;
