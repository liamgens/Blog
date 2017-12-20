import React, { Component } from 'react';
import './sidebar.css'


class PostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        post: []
    };
}

  componentDidMount(){
    const { match: { params } } = this.props;
    const url = "http://localhost:5000/posts/markdown/" + params.id;

    fetch(url)
      .then(response => response.blob())
      .then(data => console.log(data));
    //   .then(data => this.setState({ post: data }));
  }

  render() {

    return (
        <div id="posts">
            {/* {this.state.post.title}<br/>
            {this.state.post.content} */}
            {/* {this.state.post} */}
        </div> 
    );
  }
}

export default PostView;
