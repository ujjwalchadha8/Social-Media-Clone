import React from 'react';
import Navbar from '../navbar/navbar';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import EventItem from './EventItem';

class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            error: null
        }
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getAllEvents((events) => {
            console.log(events);
            events.forEach(element => {
                element.id = Math.floor(Math.random() * Math.floor(100000))
            });
            this.setState({
                events: events
            })
        }, (error) => {
            console.error(error);
            this.setState({
                error: error
            })
        })
    }

    render() {
        let eventList = this.state.events.map((event) => {
            return (
                <li key={event.id}>
                    <EventItem event={event}></EventItem>
                </li>
            )
        })
        return (
            <div>
                <Navbar activeTab='events'></Navbar>
                <div className="container below-navbar">
                    <ul className="list-unstyled">
                        {eventList}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Events;