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
            successCallback(response.body.profile)
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

    createProfile(name, email, gender, age, city, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.CREATE_PROFILE, {
            displayName: name, 
            email: email,
            gender: gender,
            age: age,
            city: city,
        }, response => {
            successCallback(response);
        }).catch(errorCallback);
    }

    updateProfile(name, email, gender, age, city, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.UPDATE_PROFILE, {
            displayName: name, 
            email: email,
            gender: gender,
            age: age,
            city: city,
        }, response => {
            successCallback(response);
        }).catch(errorCallback);
    }

    getSession(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_SESSION, null, successCallback).catch(errorCallback)
    }

    getFeedPosts(fromTimestamp, toTimestamp, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_FEED_POSTS, {}, (response) => {
            response.body.posts[0].sort((post1, post2) => {
                return (new Date(post2.time) - new Date(post1.time))
            });
            successCallback(response.body.posts[0]);                
        }).catch((error) => {
            errorCallback(error)
        })
    }

    getPostsBy(uid, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_USER_POSTS, {
            userID: uid
        }, (response) => {
            console.log(response);
            response.body.posts[0].sort((post1, post2) => {
                return (new Date(post2.time) - new Date(post1.time))
            });
            successCallback(response.body.posts[0]);
        }).catch(errorCallback);
    }

    getGroupPosts(gid, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.GET_GROUP_POSTS, {
            groupID: gid
        }, response => {
            if (!response.body[0]) {
                successCallback([]);
                return;
            }
            response.body[0].sort((post1, post2) => {
                return (new Date(post2.time) - new Date(post1.time))
            });
            successCallback(response.body[0]);
        }).catch(errorCallback);
    }

    getPostComments(postId, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_POST_COMMENTS, {
            postID: postId
        }, (response) => {
            successCallback(response.body[0]);
        }).catch((error) => {
            errorCallback(error);
        })
    }

    getPostLikes(postId, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_LIKED_USERS, {
            postID: postId
        }, (response) => {
            successCallback(response.body);
        }).catch(errorCallback);
    }

    removeLike(postId, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.REMOVE_LIKE, {
            postID: postId
        }, (response) => {
            successCallback(response.body);
        }).catch(errorCallback);
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

    getGroupDetails(gid, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_GROUP_DETAILS, {
            groupID: gid
        }, response => {
            successCallback(response.body.events[0]);
        }).catch(errorCallback);
    }

    searchLocations(searchText, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.SEARCH_LOCATION, {
            locationName: searchText
        }, response => {
            successCallback(response.body);
        }).catch(error => {
            errorCallback(error);
        });
    }

    getAvailableRestrictions(successCallback, errorCallback) {
        this.getUserGroups((groups)=> {
            let restrictions = [
                {
                    restrictionId: 1,
                    name : 'Public',
                    type:'restriction'
                }, {
                    restrictionId: 2,
                    name : 'Private',
                    type:'restriction'
                }, {
                    restrictionId: 3,
                    name: 'Friends of friends',
                    type:'restriction'
                }
            ]
            groups.forEach(group => {
                restrictions.push({
                    restrictionId: group.GID,
                    name: group.Title,
                    type:'group'
                })
            });
            successCallback(restrictions)
        }, errorCallback);
    }

    addNewPost(postTitle, postContent, postLocationId, postRestrictionId, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.ADD_POST, {
            title: postTitle,
            locationID: postLocationId,
            restrictionID: postRestrictionId
        }, (response) => {
            let postId = response.body[0].ID;
            $.post(API.BASE_URL + API.ADD_POST_CONTENT, {
                PostID: postId,
                type: 'text',
                data: postContent
            }, response => {
                successCallback(response)
            }).catch(errorCallback);
        }).catch(errorCallback);
    }

    addNewComment(postId, commentText, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.ADD_COMMENT, {
            postID: postId,
            commentText: commentText
        }, response => {
            successCallback(response);
        }).catch(errorCallback);
    }

    addLike(postId, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.ADD_LIKE, {
            postID: postId
        }, response => {
            successCallback(response);
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
            successCallback(response.body.events[0]);
        }).catch(error => {
            errorCallback(error);
        })
        
    }
	
	getDirectFriends(uid, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_DIRECT_FRIENDS, {
            userID: uid
        }, (response) => {
            successCallback(response.body.events[0]);
        }).catch(error => {
            errorCallback(error);
        })
    }

    searchUsers(search, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.SEARCH_FRIENDS, {
            username: search
        }, response => {
            successCallback(response.body);
        }).catch(errorCallback);
    }

    sendFriendrequest(uid, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.SEND_FRIEND_REQUEST, {
            friendID: uid
        }, response => {
            successCallback(response);
        }).catch(error => errorCallback);
    }

    acceptFriendRequest(uid, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.ACCEPT_FRIEND_REQUEST, {
            friendID: uid
        }, response => {
            successCallback(response);
        }).catch(error => errorCallback);
    }

    removeFriend(uid, successCallback, errorCallback) {
        $.post(API.BASE_URL + API.REMOVE_FRIEND, {
            friendID: uid
        }, response => {
            successCallback(response);
        }).catch(error => errorCallback);
    }

    getFriendRequests(successCallback, errorCallback) {
        $.get(API.BASE_URL + '/get_friends_status_requests', null, (response) => {
            successCallback(response.body.events[0]);
        }).catch(errorCallback)
    }

    getTimeline(uid, successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_TIMELINE, {
            uid: uid
        }, (response) => {
            let timeline = response.body;
            let count = 100;
            timeline.forEach(activity => {
                activity.fakeId = count++;
            })
            successCallback(timeline);
        }).catch(errorCallback);
    }

    joinGroup(gid, successCallback, errorCallback) {
        $.post(API.BASE_URL + '/subscribe_to_group', {
            GroupID: gid
        }, successCallback).catch(errorCallback);
    }

    removeGroup(gid, successCallback, errorCallback) {
        $.post(API.BASE_URL + '/unsubscribe_group', {
            groupID: gid
        }, successCallback).catch(errorCallback);
    }

}

export default DataManager;