import React, { Component } from 'react';
import './sidebar.css'

class Sidebar extends Component {
  render() {
    return (
        <div class="sidebar">
            <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/21034177_510494935952755_1707712965450344419_n.jpg?oh=81f8c085ca74560975f9f4a51cdef8de&oe=5AC8CFA7" height="200px" width="200px"></img>
            <h2 id="name">Liam Gensel</h2>
            <h5 id="bio">On a mission to "Tinder-ify" the world. asdfasdfsjdfhkjasdhfkjh</h5>
            <form>
                <input type="text" name="email" id="email" placeholder="peter@example.com"/>
                <input type="submit" value="Subscribe" id="subscribe"/>
            </form>
            <h5>liamgens</h5>
            <h5>liamgens</h5>
        </div> 
    );
  }
}

export default Sidebar;
