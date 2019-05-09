import React from 'react';
import { Link } from "react-router-dom";
import DataManager from '../DataManager';

class GroupItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: props.group
        }
        this.dataManager = new DataManager();
    }

    handleJoinClick() {
        this.dataManager.joinGroup(this.state.group.GID, (response) => {
            
        }, (error) => {
            console.error(error)
        })
    }

    render() {
        let group = this.state.group;
        return (
            <div className="card bg-light">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to={group.isJoined ? "/groups/"+group.GID : "#"}><h4>{group.Title}</h4></Link>
                            <p>{group.Description}</p>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-primary float-right" 
                                onClick={this.handleJoinClick.bind(this)}
                                hidden={group.isJoined}>Join</button>
                            <button className="btn btn-info float-right" hidden={!group.isJoined}>Joined</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupItem;