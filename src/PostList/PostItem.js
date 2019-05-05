import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';

class PostItem extends React.Component {

    handleCommentsClick(pid, event) {
        this.dataManager.getPostComments(pid, (response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        let post = this.props.post;
        return (
            <div className="row">
                <div className="offset-md-1 col-md-10 mt-4 mb-2">
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
            </div>
        )
    }   

}

export default PostItem;