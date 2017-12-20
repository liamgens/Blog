import React, { Component } from 'react';
import './sidebar.css'
import {withRouter} from "react-router-dom";

class PostPreview extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: this.props.title,
      image: this.props.image,
      id: this.props.id
    }
  }
  
  render() {
    return (
        <div class="postPreview">
            <img src={this.state.image} width="100%" height="100%" onClick={()=>{
              console.log("Clicked: " + this.state.id);
              this.props.history.push("/posts/" + this.state.id);
            }}/>
            <h3 class="postTitle"><span>{this.state.title}</span></h3>
        </div> 
    );
  }
}

export default withRouter(PostPreview);
