import styled, { css } from 'styled-components';
import React, { Component } from 'react';

const input_style = {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
}

const label_style = {
    color: '#4a90e2',
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: '12px'
}

const div_style = {
    backgroundColor: 'grey',
    width: '111px',
    height: '26px',
    lineHeight: '26px',
    textAlign: 'center',
    background: 'transparent',
    borderRadius: '3px',
    border: '2px solid #4a90e2',
    display: 'inline-block',
}
class FileInput extends Component {
    render() {
        return (
            <div style={div_style}>
                <input type="file" name="file" id="file" style={input_style} onChange={this.props.action} />
                <label for="file" style={label_style}>Choose a file</label>
            </div>
        );
    }
}

export default FileInput;