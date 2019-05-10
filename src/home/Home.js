import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import Navbar from '../navbar/navbar';
import PostItem from '../PostList/PostItem';
import AddPost from '../PostList/AddPost';
import AddEvent from '../events/AddEvent';
import FormComponent from '../_utils/FormComponent';

class Home extends FormComponent {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            visiblePosts: [],
            titleSearchText: "",
            locationSearchText: ""
        }
        this.dataManager = new DataManager();
        this.postModalHandlers = this.postModalHandlers.bind(this);
        this.eventModalHandlers = this.eventModalHandlers.bind(this);
    }

    componentDidMount() {
        Utils.requireActiveSession(this);
        this.dataManager.getFeedPosts(null, null, (posts)=>{
            this.setState({
                posts: posts,
                visiblePosts: posts
            })
        }, (error) =>{
            console.error(error);
        });
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

    handleFormTextChange(event) {
        super.handleFormTextChange(event);
        let locationSearchText = "";
        let titleSearchText = "";
        if (event.target.name === "titleSearchText") {
            titleSearchText = event.target.value;
            locationSearchText = this.state.locationSearchText;
        } else if (event.target.name === "locationSearchText") {
            locationSearchText = event.target.value;
            titleSearchText = this.state.titleSearchText;
        }
        let visiblePosts = []
        this.state.posts.forEach(post => {
            if (!post.locationName) post.locationName = "";
            if (post.title.toLowerCase().includes(titleSearchText.toLowerCase()) || titleSearchText.replace(" ", "") === "") {
                if (post.locationName.toLowerCase().includes(locationSearchText.toLowerCase()) || locationSearchText.replace(" ", "") === "") {
                    visiblePosts.push(post);
                }
            }
        });
        this.setState({
            visiblePosts: visiblePosts
        })
    }

    render() {
        let postListItems = this.state.visiblePosts.map((post) => {
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
                    <div className="container">
                        
                        <div className="offset-md-1 col-md-10">
                            <strong className="mb-3">FILTER POSTS</strong>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Search Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </div>
                                <input type="text" className="form-control"
                                        onChange={this.handleFormTextChange}
                                        value={this.state.titleSearchText}
                                        name="titleSearchText"/>
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Search Location</span>
                                </div>
                                <input type="text" className="form-control" 
                                    onChange={this.handleFormTextChange}
                                    value={this.state.locationSearchText}
                                    name="locationSearchText"/>
                            </div>
                        </div>
                        
                    </div>
                    <ul>{postListItems}</ul>
                </div>
            </div>
        )
    }
}

export default Home;