import $ from 'jquery/dist/jquery';
import API from './constants';

class DataManager {

    constructor() {
        $.ajaxSetup({
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        });
    }

    login(username, password, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.LOGIN, 
         {
             username: username,
             password: password
         }, (response) => {
            successCallback(response);
        }).catch(error=> {
            errorCallback(error);
        });
    }

    logout(successCallback, errorCallback) {
        $.post(API.BASE_URL + API.LOGOUT, successCallback).catch(errorCallback);
    }

    getProfile(username, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_PROFILE, { username: username }, (response) => {
            successCallback(response)
        }).fail(error => {
            errorCallback(error)
        });
    }

    register(username, password, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.REGISTER, 
         {
             username: username,
             password: password
         }, (response) => {
            successCallback(response);
        }).catch(error=> {
            errorCallback(error);
        });
    }

    getSession(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_SESSION, null, successCallback).catch(errorCallback)
    }

    getFeedPosts(fromTimestamp, toTimestamp, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_FEED_POSTS, {}, (response) => {
            successCallback(response.body.posts[0]);                
        }).catch((error) => {
            errorCallback(error)
        })
    }

    getPostComments(postId, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_POST_COMMENTS, {
            postID: postId
        }, (response) => {
            successCallback(response);
        }).catch((error) => {
            errorCallback(error);
        })
    }

}

export default DataManager;