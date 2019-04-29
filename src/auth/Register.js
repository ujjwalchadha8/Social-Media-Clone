import React from 'react';
import $ from 'jquery/dist/jquery';

import './Register.css'
import DataManager from '../DataManager';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.dataManager = new DataManager();
        this.state = {
            usernameText: "",
            passwordText: "",
            confirmPasswordText: "",
            errorText: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
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

    handleConfirmPasswordChange(event) {
        this.setState({
            confirmPasswordText: event.target.value
        })
    }

    handleRegisterClick() {
        if (!this.passwordsMatch()) {
            this.setState({
                errorText: "Passwords don't match"
            })
            return;
        }
        this.dataManager.register(this.state.usernameText, this.state.passwordText, (response) => {
            console.log(response);
        }, (error) => {
            switch(error.responseJSON.reason){
                case "USER_TAKEN":
                    this.setState({
                        errorText: "Username is already taken"
                    })
                    break;
                case "SERVER_ERROR":
                    this.setState({
                        errorText: "Unknown server error occured. Try again later."
                    })
                    break;
                default:
                    this.setState({
                        errorText: "Unknown error occured. Try again later."
                    })
                    console.error(error);
                    break;
            }
        })
    }

    passwordsMatch() {
        return this.state.passwordText === this.state.confirmPasswordText
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
                                    value={this.state.usernameText}
                                    onChange={this.handleUsernameChange}
                                    className="form form-control" 
                                    type="text" 
                                    placeholder="Pick a username"/>
                                <input 
                                    value={this.state.passwordText}
                                    onChange={this.handlePasswordChange}
                                    className="form form-control mt-2" 
                                    type="password" 
                                    placeholder="Create password"/>

                                <input 
                                    value={this.state.confirmPasswordText}
                                    onChange={this.handleConfirmPasswordChange}
                                    className="form form-control mt-2" 
                                    type="password" 
                                    placeholder="Confirm Password"/>
                                
                                <button 
                                    className="btn btn-primary mt-4 fill-width"
                                    onClick={()=>this.handleRegisterClick()}>
                                    Sign Up!
                                </button>
                                <p className="text-center mt-2"> or </p>
                                <button className="btn btn-danger fill-width">Existing User? Login here</button>
                                <p>{this.state.errorText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Register;