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
            postGroupId: -1,
            postLocationId: -1,
            postLocationText: "",
            errorText: "",
            photo: null,
        }
        this.photoInput = React.createRef();
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
        });
    }

    openModal() {
        $("#modalAddPost").modal('show');
    }

    closeModal() {
        $("#modalAddPost").modal('hide')
    }

    handleRestrictionChange(event) {
        let id = event.target.value;
        this.setState({
            postRestrictionId: id <=3 ? id : -1,
            postGroupId: id > 3 ? id : -1,
        });
        setTimeout(() => console.log(this.state), 500);
    }

    handleFormTextChange(event) {
        super.handleFormTextChange(event);
        switch (event.target.name) {
            case "postLocationText":
                let text = event.target.value;
                this.dataManager.searchLocations(text, (locations) => {
                    let locationId = -1;
                    locations.forEach(availableLocation => {
                        if (text.toLowerCase() === availableLocation.name.toLowerCase()) {
                            locationId = availableLocation.LID
                        }
                    });
                    this.setState({
                        postLocationId: locationId,
                        availableLocations: locations
                    })
                }, error => {
                    this.state.errorText = JSON.stringify(error)
                });
                break;
        }
    }

    handleSubmit(e) {
        console.log(this.state);
        if (!this.validateCurrentPost()) {
            // this.dataManager.addNewPost(this.state.postTitle, this.state.postContent, 
            //                                 this.state.postLocationId, this.state.postRestrictionId, (response) => {
            //     console.log(response);
            //     this.closeModal()
            // }, (error) => {
            //     console.error(error);
            // }) 
            e.preventDefault();
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
        } else if (!this.state.postLocationId || this.state.postLocationId === -1) {
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
                <option key={restriction.restrictionId}
                         value={restriction.restrictionId}>{restriction.name}</option>
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
                        

                        {/* <div className="md-form mb-5">
                        <i className="fas fa-user prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form34">Post Photo</label>
                        <input type="file" id="form34" className="form-control validate"
                                name="postTitle"
                                ref={this.photoInput}
                                />
                        </div> */}

                        <form ref='uploadForm' 
                            id='uploadForm' 
                            action='http://localhost:4000/upload-post' 
                            onSubmit={this.handleSubmit.bind(this)}
                            method='post' 
                            encType="multipart/form-data">
                                <div className="md-form mb-3">
                                <i className="fas fa-user prefix grey-text"></i>
                                <label data-error="wrong" data-success="right" htmlFor="form34">Post Title</label>
                                <input type="text" id="form34" className="form-control validate"
                                        name="postTitle"
                                        value={this.state.postTitle}
                                        onChange={this.handleFormTextChange}/>
                                </div>


                                <div className="md-form mb-3">
                                <i className="fas fa-envelope prefix grey-text"></i>
                                <label data-error="wrong" data-success="right" htmlFor="form29">Privacy</label>
                                {/* <input type="email" id="form29" className="form-control validate"/> */}
                                <select className="form-control" 
                                    name="restriction"
                                    onChange={this.handleRestrictionChange.bind(this)}
                                    value={this.state.postRestrictionId == -1 ? this.state.postGroupId : this.state.postRestrictionId}>
                                    {postRestrictionsList}
                                </select>
                                </div>

                                <div className="md-form mb-3">
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

                                <div className="md-form mb-3">
                                <i className="fas fa-pencil prefix grey-text"></i>
                                <label data-error="wrong" data-success="right" htmlFor="form8">Post Content</label>
                                <textarea type="text" id="form8" 
                                    className="md-textarea form-control" rows="4"
                                    value={this.state.postContent}
                                    name="postContent"
                                    onChange={this.handleFormTextChange}></textarea>
                                </div>
                                <input type="file" name="sampleFile" />

                                <input type="hidden" name="postLocationId" value={this.state.postLocationId} />
                                <input type="hidden" name="postRestrictionId" value={this.state.postRestrictionId} />
                                <input type="hidden" name="postGroupId" value={this.state.postGroupId}></input>
                                <input type='submit' value='Submit' />
                        </form> 

                        <p className="mt-3 text-danger">{this.state.errorText}</p>
                    </div>
                    {/* <div className="modal-footer d-flex justify-content-center">
                        <input valie="Submit" type='submit' className="btn btn-success" onClick={this.handleSubmit.bind(this)}></input>
                    </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPost;