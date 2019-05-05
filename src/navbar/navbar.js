import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';

class Navbar extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        }
        Navbar.tabs = {
            HOME: "home",
            FRIENDS: "friends",
            GROUPS: "groups",
            ACCOUNT: "account",
            EVENTS: "events"
        }
    }

    render() { 
        let activeTab = this.props.activeTab ? this.props.activeTab : Navbar.tabs.HOME;
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
                        <Link className="nav-link color-white" to="/link">Friends</Link>
                    </li>
                    <li className={"nav-item dropdown " + (activeTab === Navbar.tabs.ACCOUNT ? "active" : "")}>
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        My Account
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/myprofile">View Profile</Link>
                        <Link className="dropdown-item" to="/">Edit Profile</Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/logout">Logout</a>
                        </div>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar;