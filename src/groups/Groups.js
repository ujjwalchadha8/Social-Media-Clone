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
            groups.forEach(group => {
                group.isJoined = true;
                group.isVisible = true;
            });
            console.log(groups);
            this.addToStateGroups(groups);
        }, error => {
            console.error(error);
        });
        this.dataManager.getNewGroups((groups)=>{
            groups.forEach(group => {
                group.isJoined = false;
                group.isVisible = true;
            });
            console.log(groups);
            this.addToStateGroups(groups);
        }, error => {
            console.error(error);
        });
    }

    addToStateGroups(groups) {
        let newGroups = this.state.groups.slice();
        newGroups.push(...groups);
        this.setState({
            groups: newGroups
        })
    }

    handleSearchTextChange(event) {
        let search = event.target.value;
        this.dataManager.searchUserGroups(search, (groups) =>{
            this.setState({
                groupList: groups
            }, error =>{
                console.error(error);
            })
        })

        let newGroups = this.state.groups.slice();
        newGroups.forEach(group => {
            if (group.Title.toLowerCase().includes(search.toLowerCase()) || search === "") {
                group.isVisible = true;
            } else {
                group.isVisible = false;
            }
        });
        this.setState({
            searchText: search,
            groups: newGroups
        })
    }

    render() {
        let groupListItems = this.state.groups.map((group) => {
            return (
                <li key={group.GID} className="list-unstyled mt-3" hidden={!group.isVisible}>
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