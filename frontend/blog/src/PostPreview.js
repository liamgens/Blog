import React, { Component } from 'react';
import './sidebar.css'
import { withRouter } from "react-router-dom";

class PostPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      image: this.props.image,
      id: this.props.id,
      date: this.props.date
    }
  }

  render() {
    return (
      <div className="postPreview">
        <img src={this.state.image} width="100%" height="100%" alt={this.state.title} onClick={() => {
          this.props.history.push("/posts/" + this.state.id);
        }} />
        <h3 className="postTitle"><span>{this.state.title}</span></h3>
        <h6 className="postDate"><span>{this.state.date}</span></h6>
      </div>
    );
  }
}

export default withRouter(PostPreview);
