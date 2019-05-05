import React from 'react'
import DataManager from '../DataManager';
import GroupItem from './GroupItem';
import Navbar from '../navbar/navbar';
import Utils from '../_utils/Utils';
// import { Link } from "react-router-dom";

class Groups extends React.Component {
    
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
        this.dataManager.getUserGroups((groups)=>{
            console.log(groups);
            groups.forEach(group => {
                group.isJoined = true
            });
            let newGroups = this.state.groups.slice();
            newGroups.push(...groups);
            this.setState({
                groups: newGroups
            })
        }, error => {
            console.error(error);
        });
        this.dataManager.getNewGroups((groups)=>{
            console.log(groups);
            groups.forEach(group => {
                group.isJoined = false
            });
            let newGroups = this.state.groups.slice();
            newGroups.push(...groups);
            this.setState({
                groups: newGroups
            })
        }, error => {
            console.error(error);
        });
    }

    handleSearchTextChange(event) {
        let search = event.target.value;
        this.setState({
            searchText: search
        })
        this.dataManager.searchUserGroups(search, (groups) =>{

            this.setState({
                groups: groups
            }, error =>{
                console.error(error);
            })
        })
    }

    render() {
        let groupListItems = this.state.groups.map((group) => {
            return (
                <li key={group.GID} className="list-unstyled">
                    <GroupItem group={group}></GroupItem>
                </li>
            )
        })

        return (
            <div>
                <Navbar activeTab="groups"/>
                <div className="container below-navbar">
                    <div className="form">
                        <input type="text" className="form-control ml-4" 
                            value={this.state.searchText}
                            onChange={this.handleSearchTextChange.bind(this)}></input>
                        
                    </div>
                    <ul className="mt-3">{groupListItems}</ul>
                </div>
            </div>
        )
    }

}

export default Groups;