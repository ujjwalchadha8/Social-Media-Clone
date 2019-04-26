import React from 'react';
import "./Login.css";
import $ from 'jquery/dist/jquery';

class Login extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            usernameText: "",
            passwordText: "",
            errorText: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            usernameText: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            passwordText: event.target.value
        })
    }

    handleLoginClick() {
        $.ajaxSetup({
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        });
        $.post('http://localhost:4000/login', 
         {
             username: this.state.usernameText,
             password: this.state.passwordText
         }, (response) => {
            console.log(response);
        }).catch(error=> {
            switch(error.responseJSON.reason){
                case "INVALID_USER":
                    this.setState({
                        errorText: "Invalid username and/or password."
                    })
                    break;
            }
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="panel">
                            <div className="panel-body">
                                <input  
                                    name="username"
                                    value={this.state.usernameText}
                                    onChange={this.handleUsernameChange}
                                    className="form form-control" 
                                    type="text" 
                                    placeholder="username"/>
                                <input 
                                    name="password"
                                    value={this.state.passwordText}
                                    onChange={this.handlePasswordChange}
                                    className="form form-control mt-2" 
                                    type="password" 
                                    placeholder="password"/>
                                
                                <button 
                                    className="btn btn-primary mt-4 fill-width"
                                    onClick={()=>this.handleLoginClick()}>
                                    Login
                                </button>
                                <p className="text-center mt-2"> or </p>
                                <button className="btn btn-danger fill-width">Register</button>
                                <p>{this.state.errorText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Login;