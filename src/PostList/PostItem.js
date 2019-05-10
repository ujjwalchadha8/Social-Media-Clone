import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import Utils from '../_utils/Utils';
import DataManager from '../DataManager';
import FormComponent from '../_utils/FormComponent';
import { Link } from "react-router-dom";
import './PostItem.css'

class PostItem extends FormComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
            likeCount: 0,
            commentText: "",
            comments: [],
            errorText: ""
        }
        this.dataManager = new DataManager();
    }

    componentDidMount() {        
        this.reload();
        // console.log(this.props.post);
    }

    reload() {
        this.dataManager.getPostComments(this.props.post.PID, (comments) => {
            this.setState({
                commentText: "",
                comments: comments
            })
            this.dataManager.getPostLikes(this.props.post.PID, (userLikes) => {
                this.setState({
                    likeCount: userLikes.users.length,
                    isLiked: userLikes.isLiked
                })

            })

        }, (error) => {
            console.log(error);
            Utils.activateSession(this);
        });
       
    }

    // handleCommentsClick(pid, event) {
        
    // }

    handleCommentSubmit() {
        if (!this.state.commentText) {
            return;
        }
        this.dataManager.addNewComment(this.props.post.PID, this.state.commentText, (response) => {
            this.reload();
        }, error => {
            console.error(error);
        })
    }



    handleLikeClick() {
        if (!this.state.isLiked) {
            this.dataManager.addLike(this.props.post.PID, (response) => {
                this.setState({
                    isLiked: true,
                    likeCount: this.state.likeCount + 1
                })
            }, error => {
                console.error(error);
                Utils.requireActiveSession(this);
            })
        } else {
            this.dataManager.removeLike(this.props.post.PID, (response) => {
                this.setState({
                    isLiked: false,
                    likeCount: this.state.likeCount - 1
                })
            }, error => {
                console.error(error);
                Utils.requireActiveSession(this);
            })
        }
    }

    render() {
        let post = this.props.post;
        let commentList = this.state.comments.map(comment => {
            return (
                <li className="list-group-item" key={comment.CID}>
                    <strong className="text-primary"><Link to={"/profile/"+comment.username}>@{comment.username}</Link></strong>:
                     {comment.text
                }</li>
            )
        })
        return (
            <div className="row">
                <div className="offset-md-1 col-md-10 mt-4 mb-2">
                    <div className="card">
                        <div className="card-header">
                            <strong><Link className="text-dark" to={"/profile/"+post.username}>@{post.username}</Link></strong>
                            <span className="ml-3" hidden={!post.locationName}>
                                <FontAwesomeIcon icon="map-marker"></FontAwesomeIcon>
                                <span className="ml-1">{post.locationName}</span>
                            </span>
                            <span className="float-right">{Utils.getAgoTimestamp(new Date(post.time ? post.time : post.timestamp))} ago</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content_data}</p>
                            <div className="container">
                                {/* DISPLAY IMAGE HERE */}
                                <img className="mb-4 mr-2 image-contained" accept="image/*"
                                    src={post.photo ? "http://localhost:4000/image?imagePath="+post.PID : ""}></img>
                            </div>
                            <div className="input-group">
                                <input className="form-control" type="text"
                                        value={this.state.commentText}
                                        name="commentText"
                                        onChange={this.handleFormTextChange}></input>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" onClick={this.handleCommentSubmit.bind(this)}>Comment</button>
                                </span>
                            </div>
                            <div className="mt-3">
                                <FontAwesomeIcon onClick={this.handleLikeClick.bind(this)} icon="thumbs-up" 
                                    className={"float-left cursor-pointer " + (this.state.isLiked ? "liked" : "")}></FontAwesomeIcon>
                                <span className="ml-1">{this.state.likeCount} likes</span>
                                {/* <span className="card-link d-flex justify-content-center text-primary cursor-pointer" 
                                            onClick={this.handleCommentsClick.bind(this, post.PID)}>Comments</span> */}
                            </div>
                            <div className="mt-3">
                                <ul className="list-group">{commentList}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   

}

export default PostItem;