import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import Navbar from '../navbar/navbar';
import { Link } from "react-router-dom";
import PostItem from '../PostList/PostItem';
import AddPost from '../PostList/AddPost';
import AddEvent from '../events/AddEvent';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.dataManager = new DataManager();
        this.postModalHandlers = this.postModalHandlers.bind(this);
        this.eventModalHandlers = this.eventModalHandlers.bind(this);
    }

    componentWillMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getFeedPosts(null, null, (posts)=>{
            this.setState({
                posts: posts
            })
        }, (error) =>{
            console.error(error);
        })
    }

    handleAddPostClick() {
        this.openPostModal();
    }

    handleAddEventClick() {
        this.openEventModal();
    }

    postModalHandlers(openModal, closeModal) {
        this.openPostModal = openModal;
        this.closePostModal = closeModal;
        console.log('added post modal handlers')
    }

    eventModalHandlers(openModal, closeModal) {
        this.openEventModal = openModal;
        this.closeEventModal = closeModal;
        console.log('added event modal handlers')
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
                <Navbar activeTab="home"/>
                <div className="container below-navbar">
                    <AddEvent modalHandlers={this.eventModalHandlers}></AddEvent>
                    <AddPost modalHandlers={this.postModalHandlers}></AddPost>
                    <div className="jumbotron">
                        <h1 className="display-4">New York University</h1>
                        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-4"/>
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                            <button onClick={this.handleAddPostClick.bind(this)} className="btn btn-primary btn-lg" role="button">Create a Post</button>
                            <button onClick={this.handleAddEventClick.bind(this)} className="btn btn-success btn-lg ml-2" role="button">Create an Event</button>
                        </p>
                    </div>
                    <ul>{postListItems}</ul>
                </div>
            </div>
        )
    }
}

export default Home;