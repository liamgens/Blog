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

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectToReferrer: false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);

    }

    login(event) {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
        })

        event.preventDefault();

    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
        console.log(this.state.redirectToReferrer)
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div style={div}>
                <form onSubmit={this.login}>
                    <TextInput style={component_style} width="200px" height="auto" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" /><br />
                    <TextInput style={component_style} width="200px" height="auto" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" /><br />
                    <Button type="submit" value="login" width="200px" primary>Login</Button>
                </form>
            </div>
        )
    }
}

export default Login;