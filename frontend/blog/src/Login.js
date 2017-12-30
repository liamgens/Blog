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
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        var json = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(json);


        event.preventDefault();
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div style={div}>
                <form onSubmit={this.handleSubmit}>
                    <TextInput style={component_style} width="200px" height="auto" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" /><br />
                    <TextInput style={component_style} width="200px" height="auto" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" /><br />
                    <Button type="submit" value="login" width="200px" primary>Login</Button>
                </form>
            </div>
        )
    }
}

export default Login;