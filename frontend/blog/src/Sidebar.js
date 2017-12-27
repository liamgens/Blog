import React, { Component } from 'react';
import './sidebar.css';
import Button from './Button.js';
import Link from './Link.js';
const a_style = {
    textDecoration: 'none',
    color: 'black',
    fontFamily: "helvetica"
}

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/21034177_510494935952755_1707712965450344419_n.jpg?oh=81f8c085ca74560975f9f4a51cdef8de&oe=5AC8CFA7" height="200px" width="200px" alt=""></img>
                <h2 id="name">Liam Gensel</h2>
                <h5 id="bio">On a mission to "Tinder-ify" the world.</h5>
                <form>
                    <input type="text" name="email" id="email" placeholder="peter@example.com" />
                    <Button primary>Subscribe</Button>
                </form>
                <Link title="liamgens" icon="github" link="https://www.github.com/liamgens" />
                <Link title="liamgens" icon="facebook-official" link="https://www.github.com/liamgens" />
            </div>
        );
    }
}

export default Sidebar;
