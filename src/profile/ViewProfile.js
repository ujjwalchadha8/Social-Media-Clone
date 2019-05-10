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
            friends: [],
            timeline: [],
            myFeedPosts: [],
            timelinePostVisible: {}
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
            });
            this.dataManager.getTimeline(profile.uid, (timeline) => {
                console.log(timeline)
                this.setState({
                    timeline: timeline
                })
            }, error => {
                console.error(error);
            });
            this.dataManager.getFeedPosts(null, null, (posts) => {
                this.setState({
                    myFeedPosts: posts
                })
            }, error => console.error(error))
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

    getPostForId(postId) {
        for (let post in this.state.posts) {
            if (this.state.posts[post].PID == postId) {
                return this.state.posts[post];
            }
        }
        for (let post in this.state.myFeedPosts) {
            if (this.state.myFeedPosts[post].PID == postId) {
                return this.state.myFeedPosts[post];
            }
        }
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
        let timelineItems = this.state.timeline.map((timelineItem) => {
            return (
                <li key={timelineItem.fakeId} className="list-unstyled" hidden={!this.getPostForId(timelineItem.eventId)}>
                     <div className="card bg-light mt-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <strong>
                                    {timelineItem.eventType == 'add_like' ? "Liked a post" : 
                                        timelineItem.eventType == 'add_comment' ? "Commented on a post" : 
                                        timelineItem.eventType == 'upload_post' ? "Added a post" : ""} 
                                    </strong>
                                    <div className="float-right"
                                    //  hidden={!this.state.timelinePostVisible[timelineItem.fakeId]}
                                     >
                                        {Utils.getAgoTimestamp(new Date(timelineItem.timestamp))}                        
                                    </div>
                                    {this.getPostForId(timelineItem.eventId) && <PostItem post={this.getPostForId(timelineItem.eventId)}/>}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <li className="nav-item">
                                        <Link className={"nav-link " + (activeTab === 'timeline' ? 'active' : '')} 
                                                to={"/profile/"+this.state.profile.username+"/timeline"}>Timeline</Link>
                                    </li>
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
                        <div hidden={activeTab !== 'timeline'}>
                            {timelineItems}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

}

export default ViewProfile;