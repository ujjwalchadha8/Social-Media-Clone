import React from 'react';
import FormComponent from '../_utils/FormComponent';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import Navbar from '../navbar/navbar'

class EditProfile extends FormComponent {
    
    constructor(props) {
        super(props)
        this.state = {
            nameText: "",
            emailText: "",
            genderText: "",
            ageText: "",
            cityText: "",
            errorText: "",
            isNewProfile: true
        };
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getProfile(null, (profile) => {
            if (profile) {
                this.setState({
                    nameText: profile.displayName,
                    emailText: profile.email,
                    genderText: profile.gender,
                    ageText: profile.age,
                    cityText: profile.city,
                    isNewProfile: false
                })
            } else {
                this.setState({
                    isNewProfile: false
                })
            }
        }, error => {
            Utils.requireActiveSession(this);
            console.error(error);
        })
    }

    validateProfile() {
        if (!this.state.nameText) {
            this.setState({
                errorText: "Name cannot be empty"
            })
            return false;
        } else if (!this.state.emailText || !this.isEmailValid(this.state.emailText)) {
            this.setState({
                errorText: "Invalid email"
            })
            return false;
        } else if (!this.state.genderText || !["male", "female"].includes(this.state.genderText.toLowerCase())) {
            this.setState({
                errorText: "Gender must be one of 'male' or 'female'"
            })
            return false;
        } else if (!this.state.ageText || parseInt(this.state.ageText) < 18 || parseInt(this.state.ageText) > 100) {
            this.setState({
                errorText: "Age must be between 18 and 100"
            })
            return false;
        } else if (!this.state.cityText) {
            this.setState({
                errorText: "City cannot be empty"
            })
            return false;
        }
        return true;
    }

    isEmailValid(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSubmit() {
        if (!this.validateProfile()) {
            return;
        }
        
        if (this.state.isNewProfile) {
            this.dataManager.createProfile(this.state.nameText, this.state.emailText, this.state.genderText.toLowerCase(), this.state.ageText, this.state.cityText,
                (response) => {
                    
                    Utils.redirectTo(this, "/home");
                }, error => {
                    console.error(error);
                    this.setState({
                        errorText: JSON.stringify(error)
                    })
                })
        } else {
            this.dataManager.updateProfile(this.state.nameText, this.state.emailText, this.state.genderText.toLowerCase(), this.state.ageText, this.state.cityText,
                (response) => {
                    alert("Profile successfully updated");
                    Utils.redirectTo(this, "/home");
                }, error => {
                    console.error(error);
                    this.setState({
                        errorText: JSON.stringify(error)
                    })
                })
        }
    }
    
    render() {
        return (
            <div>
            <Navbar/>
            <div className="container below-navbar">
                <div className="row mt-5">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h4>{this.state.isNewProfile ? "Create " : "Edit"} your profile</h4>
                        <div className="panel">
                            <div className="panel-body">
                                <input  
                                    name="nameText"
                                    value={this.state.nameText}
                                    onChange={this.handleFormTextChange}
                                    className="form form-control" 
                                    type="text" 
                                    placeholder="name"/>
                                <input 
                                    name="emailText"
                                    value={this.state.emailText}
                                    onChange={this.handleFormTextChange}
                                    className="form form-control mt-2" 
                                    type="email" 
                                    placeholder="email"/>
                                <input 
                                    name="genderText"
                                    value={this.state.genderText}
                                    onChange={this.handleFormTextChange}
                                    className="form form-control mt-2" 
                                    type="text" 
                                    placeholder="gender"/>
                                <input 
                                    name="ageText"
                                    value={this.state.ageText}
                                    onChange={this.handleFormTextChange}
                                    className="form form-control mt-2" 
                                    type="number" 
                                    placeholder="age"/>
                                <input 
                                    name="cityText"
                                    value={this.state.cityText}
                                    onChange={this.handleFormTextChange}
                                    className="form form-control mt-2" 
                                    type="text" 
                                    placeholder="city"/>
                                <button 
                                    className="btn btn-primary mt-4 fill-width"
                                    onClick={()=>this.handleSubmit()}>
                                    Submit
                                </button>
                                
                                <p>{this.state.errorText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    } 
}

export default EditProfile;