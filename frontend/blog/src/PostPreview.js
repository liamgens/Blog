import React, { Component } from 'react';
import './sidebar.css'
import './PostPreview.css'
import { withRouter } from "react-router-dom";

class PostPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id
    }
  }

  fixDate(broken_date) {
    console.log("date: " + broken_date);
    let date = broken_date.split(' ');
    switch (date[2]) {
      case 'Jan':
        date[2] = "01";
        break;
      case 'Feb':
        date[2] = "02";
        break;
      case 'Mar':
        date[2] = "03";
        break;
      case 'Apr':
        date[2] = "04";
        break;
      case 'May':
        date[2] = "05";
        break;
      case 'Jun':
        date[2] = "06";
        break;
      case 'Jul':
        date[2] = "07";
        break;
      case 'Aug':
        date[2] = "08";
        break;
      case 'Sep':
        date[2] = "09";
        break;
      case 'Oct':
        date[2] = "10";
        break;
      case 'Nov':
        date[2] = "11";
        break;
      case 'Dec':
        date[2] = "12";
        break;
    }
    date = date[2] + '/' + date[1] + '/' + date[3];
    return date;
  }

  render() {
    return (
      <div className="postPreview" onClick={
        () => {
          this.props.history.push("/posts/" + this.state.id);
        }} >
        <div>
          <img id="postPreviewImage" src={this.props.image} width="100%" height="100%" alt={this.props.title} />
        </div>
        <div id="postPreviewInfo">
          <span id="postPreviewTitle">{this.props.title}</span>
          <span id="postPreviewDate">{this.fixDate(this.props.date)}</span>
        </div>
        <div>
          <p id="postPreviewDescription">{this.props.description}</p>
        </div>

      </div >
    );
  }
}

export default withRouter(PostPreview);