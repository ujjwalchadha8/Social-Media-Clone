import React from 'react';
import "./Login.css";
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import { APP_URLS } from '../constants';
import { Link } from "react-router-dom";

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
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        this.redirectUrl = new URL(window.location.href).searchParams.get('redirectUrl');
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
        this.dataManager.login(this.state.usernameText, this.state.passwordText, (response) => {
            if (this.redirectUrl) {
                Utils.redirectTo(this, this.redirectUrl)
            } else {
                Utils.redirectTo(this, APP_URLS.HOME);
            }
        }, (error) => {
            switch(error.responseJSON.reason){
                case "INVALID_USER":
                    this.setState({
                        errorText: "Invalid username and/or password."
                    })
                    break;
                default:
                    console.error(error);
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
                                <Link className="btn btn-danger fill-width" to="/register">Sign Up!</Link>
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