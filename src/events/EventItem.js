import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EventItem extends React.Component {

    render() {  
        let event = this.props.event;
        return (
            <div className="row">
                <div className="offset-md-1 col-md-10 mt-4 mb-2">
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <span className="ml-2">
                                    <FontAwesomeIcon icon="map-marker"></FontAwesomeIcon>
                                    <span className="ml-2">{event.name}</span>
                                </span>
                                <span className="float-right">13 mins ago</span>
                            </div>
                            <div className="mt-1">
                                <span className="ml-2">
                                    <FontAwesomeIcon icon="calendar"></FontAwesomeIcon>
                                    <span className="ml-2">{event.Event_date}</span>
                                </span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{event.Title}</h5>
                            <p className="card-text">{event.Description}</p>
                        </div>
                    </div>
                </div>
            </div>            
       )
    }
    
}

export default EventItem;