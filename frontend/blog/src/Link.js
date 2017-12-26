import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

const a_style = {
    textDecoration: 'none',
    color: 'black',
}

class Link extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: 'fa fa-lg fa-' + props.icon,
        }
    }

    render() {
        return (
            <div>
                <a href={this.props.link} style={a_style}><i class={this.state.icon} aria-hidden="true"> {this.props.title}</i></a>
            </div>
        );
    }
}

export default Link;
