import React from 'react';
import { Link } from "react-router-dom";

class FriendItem extends React.Component {

    // constructor(props) {
    //     this.state = {
    //         isJoined: false
    //     }
    // }

    render() {
        let group = this.props.friend;
        return (
            <div className="card bg-light mt-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to={"/profile/"+group.username} className="text-success">{group.status === 'received' ? "New Friend Request" : ""}</Link>
                            <Link to={"/profile/"+group.username}>
                                <h4>{group.username}</h4>
                            </Link>
							<p>{group.displayname}</p>                        
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendItem;