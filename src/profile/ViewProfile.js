import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';

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
    }

    render() {
        return (
            <p>HELLO FROM PROFILE</p>
        );
    }

}

export default ViewProfile;