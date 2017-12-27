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
      date: this.fixDate()
    }
  }

  fixDate() {
    var date = this.props.date.split(' ');
    switch (date[2]) {
      case 'Jan':
        date[2] = "January";
        break;
      case 'Feb':
        date[2] = "February";
        break;
      case 'Apr':
        date[2] = "April";
        break;
      case 'May':
        date[2] = "May";
        break;
      case 'Jun':
        date[2] = "June";
        break;
      case 'Jul':
        date[2] = "July";
        break;
      case 'Aug':
        date[2] = "August";
        break;
      case 'Sep':
        date[2] = "September";
        break;
      case 'Oct':
        date[2] = "October";
        break;
      case 'Nov':
        date[2] = "November";
        break;
      case 'Dec':
        date[2] = "December";
        break;
    }
    date = date[2] + ' ' + date[1] + ', ' + date[3];
    return date;
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
