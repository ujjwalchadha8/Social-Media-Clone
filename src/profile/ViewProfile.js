import React from 'react';
import $ from 'jquery/dist/jquery';
import API from '../constants';

class ViewProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        }
    }

    componentDidMount() {
        $.ajaxSetup({
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        });
        $.get(API.BASE_URL + API.GET_PROFILE, null, (response) => {
            console.log(response)
        }).fail(error => {
            this.props.history.push('/login')
            console.error(error.responseJSON)
        })
    }

    render() {
        return (
            <p>HELLO FROM PROFILE</p>
        )
    }

}

export default ViewProfile;