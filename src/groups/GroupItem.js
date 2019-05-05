import React from 'react';
import { Link } from "react-router-dom";

class GroupItem extends React.Component {

    // constructor(props) {
    //     this.state = {
    //         isJoined: false
    //     }
    // }

    render() {
        let group = this.props.group;
        return (
            <div className="card bg-light">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to={"/groups/"+group.GID}><h4>{group.Title}</h4></Link>
                            <p>{group.Description}</p>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-primary float-right" hidden={!group.isJoined}>Join</button>
                            <button className="btn btn-info float-right" hidden={group.isJoined}>Joined</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupItem;