import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.dataManager = new DataManager();
    }

    componentWillMount() {
        Utils.requireActiveSession(this);
    }

    render() {
        return (
            <h1>HOME</h1>
        )
    }
}

export default Home;