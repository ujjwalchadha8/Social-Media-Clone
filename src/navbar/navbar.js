import React from 'react';
import { Link, Route } from "react-router-dom";
import './navbar.css';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';

class Navbar extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            userList: []
        }
        Navbar.tabs = {
            HOME: "home",
            FRIENDS: "friends",
            GROUPS: "groups",
            ACCOUNT: "account",
            EVENTS: "events"
        }
        this.dataManager = new DataManager();
    }

    handleSearchTextChange(event) {
        let search = event.target.value
        this.setState({
            searchText: search
        })
        if (search === "") {
            this.setState({
                userList: []
            })
        } else {
            this.dataManager.searchUsers(search, (users) => {
                this.setState({
                    userList: users
                })
            }, (error) => console.error(error))
        }
    }

    handleSubmit() {
        Utils.redirectTo(this, '/profile/'+this.state.searchText)
    }

    render() { 
        let activeTab = this.props.activeTab ? this.props.activeTab : Navbar.tabs.HOME;
        let userListHtml = this.state.userList.map(user => {
            console.log(user);
            return (
                <option key={user.UID} value={user.uid}>{user.username}</option>
            )
        });
        return (
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary">
                <Link className="navbar-brand" to="/home">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className={"nav-item " + (activeTab === Navbar.tabs.GROUPS ? "active" : "")}>
                        <Link className="nav-link" to="/groups">Groups</Link>
                    </li>
                    <li className={"nav-item " + (activeTab === Navbar.tabs.EVENTS ? "active" : "")}>
                        <Link className="nav-link" to="/events">Events</Link>
                    </li>
                    <li className={"nav-item " + (activeTab === Navbar.tabs.FRIENDS ? "active" : "")}>
                        <Link className="nav-link color-white" to="/friends">Friends</Link>
                    </li>
                    <li className={"nav-item dropdown " + (activeTab === Navbar.tabs.ACCOUNT ? "active" : "")}>
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        My Account
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/myprofile">View Profile</Link>
                        <Link className="dropdown-item" to="/myprofile/edit">Edit Profile</Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/logout">Logout</a>
                        </div>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" 
                            type="search" placeholder="Search" aria-label="Search"
                            onChange={this.handleSearchTextChange.bind(this)}
                            value={this.state.searchText}
                            list="searchUserDataList"/>
                        <datalist id="searchUserDataList">
                            {userListHtml}
                        </datalist>
                        <button type="button" 
                            onClick={this.handleSubmit.bind(this)} 
                            className="btn btn-outline-success my-2 my-sm-0">GO!</button>
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar;