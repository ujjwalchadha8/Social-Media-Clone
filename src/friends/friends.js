import React from 'react'
import DataManager from '../DataManager';
import FriendItem from './GroupItem';
import Navbar from '../navbar/navbar';
import Utils from '../_utils/Utils';
// import { Link } from "react-router-dom";

class Friends extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            searchText: ""
        }
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getDirectFriends(null, (groups)=>{
            this.setState({
                groups: groups
            })
        }, error => {
            console.error(error);
        });
        this.dataManager.getFriendRequests(friends => {
            console.log('HI', friends);
            let newFriends = friends
            newFriends.push(...this.state.groups.slice());
            
            this.setState({
                groups: newFriends
            })
            console.log(newFriends);
        })
        
    }

    handleSearchTextChange(event) {
        let search = event.target.value;
        this.setState({
            searchText: search
        })
    }

    render() {
        let friendListItems = this.state.groups.map((group) => {
            return (
                <li key={group.friend_id} className="list-unstyled">
                    <FriendItem friend={group}></FriendItem>
                </li>
            )
        })

        return (
            <div>
                <Navbar activeTab="groups"/>
                <div className="container below-navbar">
                    <div className="form">
                    </div>
                    <ul className="mt-3">{friendListItems}</ul>
                </div>
            </div>
        )
    }

}

export default Friends;