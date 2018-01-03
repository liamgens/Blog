import React, { Component } from 'react';
import TextInput from './TextInput';
import Button from './Button';

const div = {
    margin: "78.5px 25% 10px 25%",
    textAlign: "center"
}

const component_style = {
    marginBottom: "5px"
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.test = this.test.bind(this);

    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
        event.preventDefault();
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
        event.preventDefault();
    }

    test(event) {
        this.props.callback(this.state.username, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div style={div}>
                <TextInput style={component_style} width="200px" height="auto" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" /><br />
                <TextInput style={component_style} width="200px" height="auto" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" /><br />
                <Button type="submit" value="login" width="200px" primary onClick={this.test}>Login</Button>
            </div>
        )
    }
}

export default Login;