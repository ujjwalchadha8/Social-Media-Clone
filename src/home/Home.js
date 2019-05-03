import React from 'react';
import DataManager from '../DataManager';
import Utils from '../_utils/Utils';
import Navbar from '../navbar/navbar';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.dataManager = new DataManager();
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

    handleCommentsClick(pid, event) {
        this.dataManager.getPostComments(pid, (response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        let postListItems = this.state.posts.map((post) => {
            return (
                <li key={post.PID} className="list-unstyled">
                    <div className="offset-md-2 col-md-8 mt-4 mb-2">
                        <div className="card">
                            <div className="card-header">
                                <strong>@{post.username}</strong>
                                <span className="ml-3" hidden={!post.locationName}>
                                    <FontAwesomeIcon icon="map-marker"></FontAwesomeIcon>
                                    <span className="ml-1">{post.locationName}</span>
                                </span>
                                <span className="float-right">13 mins ago</span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{post.displayname}</h5>
                                <p className="card-text">{post.content_data}</p>
                                <div >
                                    <FontAwesomeIcon icon="thumbs-up" className="float-left"></FontAwesomeIcon>
                                    <span className="ml-1">3 </span>
                                    <span className="card-link d-flex justify-content-center text-primary cursor-pointer" 
                                                onClick={this.handleCommentsClick.bind(this, post.PID)}>Comments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div>
                <Navbar activeTab="home"/>
                <div className="container below-navbar">
                    <div className="jumbotron">
                        <h1 className="display-4">Hello, world!</h1>
                        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-4"/>
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/myprofile" role="button">Learn more</Link>
                        </p>
                    </div>
                    <ul>{postListItems}</ul>
                </div>
            </div>
        )
    }
}

export default Home;