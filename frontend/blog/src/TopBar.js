import React, { Component } from 'react';
import './sidebar.css';
import 'font-awesome/css/font-awesome.min.css';

const div_style = {
    backgroundColor: '#4a90e2',
    color: 'white',
    fontFamily: 'helvetica',
    padding: '10px',
    fontSize: '36px',
}

const a_style = {
    textDecoration: 'none',
    color: 'white',
    margin: '6px'
}

const span_style_1 = {
    float: 'right',
    width: '33%',
    textAlign: 'right'
}

const span_style_2 = {
    width: '33%'
}

class TopBar extends Component {
    render() {
        return (
            <div style={div_style}>
                <a href="/" style={a_style}><span style={span_style_2}>Liam Gensel</span></a>
                <span style={span_style_2}></span>
                <span style={span_style_1}>
                    <a style={a_style} href="https://www.github.com/liamgens"><i class="fa fa-lg fa-github" aria-hidden="true"></i></a>
                    <a style={a_style} href="https://www.facebook.com/liamgens"><i class="fa fa-lg fa-facebook-official" aria-hidden="true"></i></a>
                    <a style={a_style} href="https://www.twitter.com/liamgens"><i class="fa fa-lg fa-twitter" aria-hidden="true"></i></a>
                </span>
            </div>
        );
    }

}

export default TopBar