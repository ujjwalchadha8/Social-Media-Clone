import React from 'react';
import emptyDp from '../_resources/empty_dp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileRelation } from '../constants';
import DataManager from '../DataManager';

class ProfileItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile,
        }
        this.dataManager = new DataManager();
    }

    handleSendFriendRequest() {
        this.dataManager.sendFriendrequest(this.state.profile.uid, (response) => {
            let newProfile = JSON.parse(JSON.stringify(this.state.profile));
            newProfile.data.relation = ProfileRelation.REQUESTED
            this.setState({
                profile: newProfile
            })
        }, error => {
            console.error(error);
        })
    }

    handleAcceptFriendRequest () {
        this.dataManager.acceptFriendRequest(this.state.profile.uid, (response) => {
            let newProfile = JSON.parse(JSON.stringify(this.state.profile));
            newProfile.data.relation = ProfileRelation.FRIENDS
            this.setState({
                profile: newProfile
            })
        }, error => {
            console.error(error);
        })
    }

    handleRemoveFriend() {
        this.dataManager.removeFriend(this.state.profile.uid, (response) => {
            let newProfile = JSON.parse(JSON.stringify(this.state.profile));
            newProfile.data.relation = ProfileRelation.UNKNOWN;
            this.setState({
                profile: newProfile
            })
        }, error => {
            console.error(error);
        })
    }

    render() {
        let profile = this.state.profile;
        return (
            <div className="row">
                <div className="offset-md-2 offset-sm-1 col-xs-12 col-sm-10 col-md-8">
                    <div className="card card-body bg-light">
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <img src={emptyDp} alt="" className="img-rounded img-fluid" />
                            </div>
                            <div className="col-sm-6 col-md-8">
                                <h4>{profile.displayName}</h4>
                                <span></span>
                                <small><FontAwesomeIcon className="mr-1" icon="map-marker"></FontAwesomeIcon><cite title={profile.city}>{profile.city}<i className="glyphicon glyphicon-map-marker">
                                </i></cite></small>
                                <p>
                                    <i className="glyphicon glyphicon-envelope"></i>{profile.email}
                                    <br />
                                    <i className="glyphicon glyphicon-globe"></i>{profile.gender}
                                    <br />
                                    <i className="glyphicon glyphicon-gift"></i>{profile.age}</p>
                                {/* <!-- Split button --> */}
                                <div hidden={profile.data.relation === ProfileRelation.ME}>
                                    <button type="button" className="btn btn-primary" 
                                        hidden={profile.data.relation !== ProfileRelation.UNKNOWN}
                                        onClick={this.handleSendFriendRequest.bind(this)}>
                                        Connect
                                    </button>
                                    <button type="button" className="btn btn-primary" 
                                        hidden={profile.data.relation !== ProfileRelation.REQUESTED}
                                        onClick={this.handleRemoveFriend.bind(this)}>
                                        Requested
                                    </button>
                                    <button type="button" className="btn btn-primary" 
                                        hidden={profile.data.relation !== ProfileRelation.RECEIVED}
                                        onClick={this.handleAcceptFriendRequest.bind(this)}>
                                        Accept Friend Request
                                    </button>
                                    <button type="button" className="btn btn-primary" 
                                        hidden={profile.data.relation !== ProfileRelation.FRIENDS}
                                        onClick={this.handleRemoveFriend.bind(this)}>
                                        Friends
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileItem;