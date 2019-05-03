import React from 'react';

class EditProfile extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            usernameText: "",
            passwordText: "",
            errorText: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }

    handleLoginClick() {
        console.log(this.state)
        // $.post('http://localhost:4000/login', 
        //  {
        //      username: this.state.usernameText,
        //      password: this.state.passwordText
        //  }, (response) => {
        //     console.log(response);
        //     alert(response);
        // }).catch(error=> {
        //     switch(error.responseJSON.reason){
        //         case "INVALID_USER":
        //             this.setState({
        //                 errorText: "Invalid username and/or password."
        //             })
        //             break;
        //     }
        // })
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
                                    name="usernameText"
                                    value={this.state.usernameText}
                                    onChange={this.handleTextChange}
                                    className="form form-control" 
                                    type="text" 
                                    placeholder="username"/>
                                <input 
                                    name="passwordText"
                                    value={this.state.passwordText}
                                    onChange={this.handleTextChange}
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

export default EditProfile;