import React from 'react';
import Navbar from '../navbar/navbar';
import Utils from '../_utils/Utils';

class GroupView extends React.Component {
    
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
    }
    
    render() {
        return (
            <div>
                <Navbar active></Navbar>
            </div>
        )
    }
}

export default GroupView;