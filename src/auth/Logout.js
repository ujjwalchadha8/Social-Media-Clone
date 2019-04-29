import React from 'react';
import DataManager from '../DataManager';
import API from '../constants';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        this.dataManager.logout(response => {
            this.props.history.push(API.LOGIN);
        }, error => {
            this.props.history.push(API.LOGIN);
        })
    }

    render() {
        return (
            <h3>Logging you out...</h3>
        )
    }

}

export default Logout;