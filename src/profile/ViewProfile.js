import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import Navbar from '../navbar/navbar';
import './ViewProfile.css'
import ProfileItem from './ProfileItem';
import { Link } from "react-router-dom";
import { ProfileRelation } from '../constants';
import PostItem from '../PostList/PostItem'
import FriendItem from '../friends/GroupItem'

class ViewProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            error: null,
            posts: [],
            friends: []
        };
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        let username = null;
        if (this.props.match.params.username) {
            username = this.props.match.params.username;
        }
        this.dataManager.getProfile(username, (profile) => {
            this.setState({
                profile: profile
            });
            this.dataManager.getPostsBy(profile.uid, (posts) => {
                console.log(posts);
                this.setState({
                    posts: posts
                })
            }, error => {
                console.error(error);
            });
            this.dataManager.getDirectFriends(profile.uid, (friends) => {
                this.setState({
                    friends: friends
                })
            }, error => {
                console.error(error);
            })
        }, (error) => {
            console.error(error);
            switch(error.responseJSON.reason) {
                case "PROFILE_NOT_FOUND":
                    this.setState({
                        error: "User not found. This user may have been deleted"
                    })
                    break;
                default:
                    this.setState({
                        error: error.responseJSON.body
                    })
                    break;
            }
        });
        
    }

    getTabName() {
        return this.props.match.params.tabname ? this.props.match.params.tabname : 'posts';
    }

    render() {
        if (!this.state.profile && !this.state.error) {
            return (
                <div>
                    <p>Waiting for profile to load</p>
                </div>
            )
        } else if (this.state.error) {
            return (
                <div>
                    <Navbar></Navbar>
                    <p className="below-navbar container">{this.state.error}</p>
                </div>
            )
        }
        let activeTab = this.getTabName();
        let postListItems = this.state.posts.map((post) => {
            return (
                <li key={post.PID} className="list-unstyled">
                    <PostItem post={post}></PostItem>
                </li>
            )
        });
        let friendListItems = this.state.friends.map((friend) => {
            return (
                <li key={friend.friend_id} className="list-unstyled">
                    <FriendItem friend={friend}></FriendItem>
                </li>
            )
        });
        return (
            <div>
                <Navbar activeTab="account"/>
                <div className="below-navbar">
                     <div className="container">
                        <ProfileItem profile={this.state.profile}></ProfileItem>
                        
                        <div hidden={this.state.profile.data.relation === ProfileRelation.BLOCKED}>
                            <div className="offset-md-1 col-md-10 mt-4">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <Link className={"nav-link " + (activeTab === 'posts' ? 'active' : '')} 
                                                to={"/profile/"+this.state.profile.username+"/posts"}>Posts</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={"nav-link " + (activeTab === 'events' ? 'active' : '')} 
                                                to={"/profile/"+this.state.profile.username+"/events"}>Events</Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className={"nav-link " + (activeTab === 'friends' ? 'active' : '')} 
                                            to={"/profile/"+this.state.profile.username+"/friends"}>Friends</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div hidden={activeTab !== 'posts'}>
                            <div>{postListItems}</div>
                        </div>
                        <div hidden={activeTab !== 'friends'}>
                            {friendListItems}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

}

export default ViewProfile;