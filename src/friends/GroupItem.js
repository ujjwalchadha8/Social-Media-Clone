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
                            <Link to={"/groups/"+group.friend_id}><h4>{group.username}</h4></Link>
							<p>{group.displayname}</p>
							
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupItem;