import React from 'react';
import Navbar from '../navbar/navbar';
import Utils from '../_utils/Utils';
import DataManager from '../DataManager';
import PostItem from '../PostList/PostItem';
import GroupItem from './GroupItem';

class GroupView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            posts: []
        }
        this.dataManager = new DataManager();
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getGroupPosts(this.props.match.params.groupid, (posts)=>{
            console.log(posts)
            this.setState({
                posts: posts
            })
        }, (error) =>{
            console.error(error);
        });
        this.dataManager.getGroupDetails(this.props.match.params.groupid, (group) => {
            group.isJoined = true
            this.setState({
                group: group
            })
        }, error => console.error(error))
    }
    
    render() {
        let postListItems = this.state.posts.map((post) => {
            return (
                <li key={post.PID} className="list-unstyled">
                    <PostItem post={post}></PostItem>
                </li>
            )
        });
        return (
            <div>
                <Navbar active></Navbar>
                <div className="below-navbar container">
                    {this.state.group && <GroupItem group={this.state.group}></GroupItem>}
                    {postListItems}
                </div>
                
            </div>
        )
    }
}

export default GroupView;