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

    getPostsBy(uid, successCallback, errorCallback) {
        
    }

    getAllEvents(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_ALL_EVENTS, (response) => {
            successCallback(response.body.events);
        }).catch(errorCallback);
    }

    getUserGroups(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_USER_GROUPS, null, (response) => {
            successCallback(response.body.events[0]);
        }).catch(error => {
            errorCallback(error);
        })
    }

    getNewGroups(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_NEW_GROUPS, null, (response) => {
            successCallback(response.body.events[0]);
        }).catch(error => {
            errorCallback(error);
        })
    }

    searchLocations(searchText, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.SEARCH_LOCATION, {
            locationName: searchText
        }, response => {
            successCallback(response.body);
        }).catch(error => {
            errorCallback(error);
        });
    }

    getAvailableRestrictions(successCallback, errorCallback) {
        successCallback([
            {
                restrictionId: 1,
                name : 'Public',
            }, {
                restrictionId: 2,
                name : 'Friends'
            }, {
                restrictionId: 3,
                name: 'Friends of friends'
            }
        ])
    }

    addNewPost(postTitle, postContent, postLocationId, postRestrictionId, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.ADD_POST, {
            title: postTitle,
            locationID: postLocationId,
            restrictionID: postRestrictionId
        }, (response) => {
            let postId = response.body.insertId;
            $.post(API.BASE_URL + API.ADD_POST_CONTENT, {
                PostID: postId,
                type: 'text',
                data: postContent
            }, response => {
                successCallback(response)
            }).catch(errorCallback);
        }).catch(errorCallback);
    }

    addNewEvent(title, description, type, locationId, date, successCallback, errorCallback) {
        let dateString = date.getUTCFullYear() + '-' +
                        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
                        ('00' + date.getUTCHours()).slice(-2) + ':' + 
                        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
                        ('00' + date.getUTCSeconds()).slice(-2);
        $.post(API.BASE_URL + API.ADD_EVENT, {
            title: title,
            description: description,
            type: type,
            locationID: locationId,
            eventDate: dateString
        }, (response) => {
            successCallback(response);
        }).catch(errorCallback);
    }

    searchUserGroups(searchText, successCallback, errorCallback) {
		$.get(API.BASE_URL + API.SEARCH_GROUPS, {
            title: searchText
        }, (response) => {
			console.log(response.body.events[0]);
            successCallback(response.body.events[0]);
        }).catch(error => {
            errorCallback(error);
        })
        
    }
	
	getDirectFriends(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_DIRECT_FRIENDS, null, (response) => {
			console.log(response.body.events[0]);
            successCallback(response.body.events[0]);
        }).catch(error => {
            errorCallback(error);
        })
    }

}

export default DataManager;