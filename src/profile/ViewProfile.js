import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import Navbar from '../navbar/navbar';

class ViewProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        };
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getProfile(this.props.match.params.username, (response) => {
            this.setState({
                profile: response.body.profile
            })
        }, (error) => {
            switch(error.responseJSON.reason) {
                case "PROFILE_NOT_FOUND":

                    break;
                default:
                    console.error(error);
                    break;
            }
        })
    }

    render() {
        if (!this.state.profile) {
            return (
                <div>
                    <p>Waiting for profile to load</p>
                </div>
            )
        }
        return (
            <div>
                <Navbar activeTab="account"/>
                <div className="container below-navbar">
                    <p>PROFILE</p>
                    <p>{this.state.profile.displayName}</p>
                    <p>{this.state.profile.gender}</p>
                    <p>{this.state.profile.age}</p>
                    <p>{new Date(this.state.profile.timestamp).toISOString()}</p>
                </div>
            </div>
        );
    }

}

export default ViewProfile;