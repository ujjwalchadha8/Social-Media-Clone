import React from 'react';
import FormComponent from '../_utils/FormComponent';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils'
import $ from 'jquery';

class AddEvent extends FormComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            eventTitle: "",
            eventDescription: "",
            eventLocationId: "",
            eventDate: new Date(),
            eventType: "",
            errorText: "",
            eventLocationText: "",
            availableLocations: []
        }
        this.props.modalHandlers(this.openModal, this.closeModal);
        this.dataManager = new DataManager();
    }

    openModal() {
        $("#modalAddEvent").modal('show');
    }

    closeModal() {
        $("#modalAddEvent").modal('hide')
    }

    handleSubmit() {
        if (this.validateCurrentEvent()) {
            this.dataManager.addNewEvent(this.state.eventTitle, this.state.eventDescription, 
                        this.state.eventType, this.state.eventLocationId, this.state.eventDate, (response) => {
                console.log(response);
                this.closeModal()
            }, (error) => {
                console.error(error);
            })
            console.log('All valid');  
        }
    }

    validateCurrentEvent() {
        if (!this.state.eventTitle) {
            this.setState({
                errorText: 'Event Title cannot be empty'
            })
            return false;
        } else if (!this.state.eventDescription) {
            this.setState({
                errorText: 'Event description cannot be empty'
            })
            return false;
        } else if (!this.state.eventLocationId) {
            this.setState({
                errorText: 'Select a valid location'
            })
            return false;
        } else if (!this.state.eventDate){
            this.setState({
                errorText: 'Select a valid date'
            })
            return false;
        } else if (!this.state.eventType){
            this.setState({
                errorText: 'Event type cannot be empty'
            })
            return false;
        } else {
            return true;
        }
    }

    handleFormTextChange(event) {
        super.handleFormTextChange(event);
        switch (event.target.name) {
            case "eventLocationText":
                let text = event.target.value;
                let hasLocation = false;
                this.state.availableLocations.forEach(availableLocation => {
                    if (text.toLowerCase() === availableLocation.name.toLowerCase()) {
                        this.setState({
                            eventLocationId: availableLocation.LID
                        })
                        hasLocation = true;
                    }
                });
                if (!hasLocation) {
                    this.setState({
                        eventLocationId: null
                    })
                }
                this.dataManager.searchLocations(text, (locations) => {
                    this.setState({
                        availableLocations: locations
                    })
                }, error => {
                    this.state.errorText = JSON.stringify(error)
                });
                break;
        }
    }

    handleDateTimeChange(event) {
        this.setState({
            eventDate: Utils.createDateAsUTC(new Date(event.target.value))
        })
    }

    render() {
        let eventLocationDataList = this.state.availableLocations.map(location => {
            return (
                <option key={location.LID}>{location.name}</option>
            )
        });
        return (
            <div className="modal fade" id="modalAddEvent" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Add a new event</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
                        <div className="md-form mb-5">
                        <i className="fas fa-user prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form34">Event Title</label>
                        <input type="text" id="eventForm34" className="form-control validate"
                                name="eventTitle"
                                value={this.state.eventTitle}
                                onChange={this.handleFormTextChange}/>
                        </div>

                        <div className="md-form mb-5">
                        <i className="fas fa-pencil prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form8">Event Description</label>
                        <textarea type="text" id="eventForm8" 
                            className="md-textarea form-control" rows="4"
                            value={this.state.eventDescription}
                            name="eventDescription"
                            onChange={this.handleFormTextChange}></textarea>
                        </div>

                        <div className="md-form mb-5">
                        <i className="fas fa-user prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form34">Event Type</label>
                        <input type="text" id="eventForm247" className="form-control validate"
                                name="eventType"
                                value={this.state.eventType}
                                onChange={this.handleFormTextChange}/>
                        </div>

                        <div className="md-form mb-5">
                        <i className="fas fa-envelope prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form29">Event Date and Time</label>
                        <input className="form form-control validate" 
                            type="datetime-local"
                            onChange={this.handleDateTimeChange.bind(this)}
                            value={this.state.eventDate.toISOString().slice(0, 16)}>
                        </input>
                        </div>

                        <div className="md-form mb-5">
                        <i className="fas fa-tag prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" htmlFor="form32">Location</label>
                        <input type="text" id="eventForm32" 
                                className="form-control validate"
                                name="eventLocationText" 
                                value={this.state.eventLocationText}
                                onChange={this.handleFormTextChange} list="addEventLocationDataList"/>
                        <datalist id="addEventLocationDataList">
                            {eventLocationDataList}
                        </datalist>
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

export default AddEvent;