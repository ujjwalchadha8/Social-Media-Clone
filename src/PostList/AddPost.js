import React from 'react';
import $ from 'jquery';
import FormComponent from '../_utils/FormComponent';
import DataManager from '../DataManager';

class AddPost extends FormComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            availableLocations: [],
            availableRestrictions: [],
            postTitle: "",
            postContent: "",
            postRestrictionId: 0,
            postLocationId: null,
            postLocationText: "",
            errorText: ""
        }
        this.props.modalHandlers(this.openModal, this.closeModal);
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        this.dataManager.getAvailableRestrictions((restrictions) => {
            this.setState({
                availableRestrictions: restrictions,
                postRestrictionId: restrictions[0].restrictionId
            });

        }, (error) => {
            console.error(error);
        })
    }

    openModal() {
        $("#modalAddPost").modal('show');
    }

    closeModal() {
        $("#modalAddPost").modal('hide')
    }

    handleRestrictionChange(event) {
        this.setState({
            postRestrictionId: event.target.value
        });
        setTimeout(()=> console.log(this.state), 500);
    }

    handleFormTextChange(event) {
        super.handleFormTextChange(event);
        switch (event.target.name) {
            case "postLocationText":
                let text = event.target.value;
                this.dataManager.searchLocations(text, (locations) => {
                    this.setState({
                        availableLocations: locations
                    })
                }, error => {
                    this.state.errorText = JSON.stringify(error)
                });
                this.state.availableLocations.forEach(availableLocation => {
                    if (text === availableLocation.name) {
                        this.setState({
                            postLocationId: availableLocation.LID
                        })
                    } else {
                        this.setState({
                            postLocationId: null
                        })
                    }
                });
                break;
        }
    }

    handleSubmit() {
        if (this.validateCurrentPost()) {
            this.dataManager.addNewPost(this.state.postTitle, this.state.postContent, 
                                            this.state.postLocationId, this.state.postRestrictionId, (response) => {
                console.log(response);
                this.closeModal()
            }, (error) => {
                console.error(error);
            })  
        }
    }

    validateCurrentPost() {
        if (!this.state.postTitle) {
            this.setState({
                errorText: 'Post Title cannot be empty'
            })
            return false;
        } else if (!this.state.postContent) {
            this.setState({
                errorText: 'Post content cannot be empty'
            })
            return false;
        } else if (!this.state.postLocationId) {
            this.setState({
                errorText: 'Select a valid location'
            })
            return false;
        } else if (!this.state.postRestrictionId){
            this.setState({
                errorText: 'Select a valid privacy'
            })
            return false;
        } else {
            return true;
        }
    }

    render() {
        let postLocationDataList = this.state.availableLocations.map(location => {
            return (
                <option key={location.LID}>{location.name}</option>
            )
        });
        let postRestrictionsList = this.state.availableRestrictions.map(restriction => {
            return (
                <option key={restriction.restrictionId} value={restriction.restrictionId}>{restriction.name}</option>
            )
        })
        return (
            <div className="modal fade" id="modalAddPost" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Add a new post</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
                        <div className="md-form mb-5">
                        <i className="fas fa-user prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form34">Post Title</label>
                        <input type="text" id="form34" className="form-control validate"
                                name="postTitle"
                                value={this.state.postTitle}
                                onChange={this.handleFormTextChange}/>
                        </div>


                        <div className="md-form mb-5">
                        <i className="fas fa-envelope prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form29">Privacy</label>
                        {/* <input type="email" id="form29" className="form-control validate"/> */}
                        <select className="form-control" 
                            onChange={this.handleRestrictionChange.bind(this)}
                            value={this.state.postRestrictionId}>
                            {postRestrictionsList}
                        </select>
                        </div>

                        <div className="md-form mb-5">
                        <i className="fas fa-tag prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form32">Location</label>
                        <input type="text" id="form32" 
                                className="form-control validate"
                                name="postLocationText" 
                                value={this.state.postLocationText}
                                onChange={this.handleFormTextChange} list="addPostLocationDataList"/>
                        <datalist id="addPostLocationDataList">
                            {postLocationDataList}
                        </datalist>
                        </div>

                        <div className="md-form">
                        <i className="fas fa-pencil prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form8">Post Content</label>
                        <textarea type="text" id="form8" 
                            className="md-textarea form-control" rows="4"
                            value={this.state.postContent}
                            name="postContent"
                            onChange={this.handleFormTextChange}></textarea>
                        </div>
                        <p className="mt-3 text-danger">{this.state.errorText}</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Add <i className="ml-1"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPost;