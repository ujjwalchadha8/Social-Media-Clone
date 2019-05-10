const API = {
    BASE_URL: "http://localhost:4000",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
    GET_PROFILE: "/get-profile",
    CREATE_PROFILE: "/create-profile",
    UPDATE_PROFILE: "/update-profile",
    GET_SESSION: "/session",
    GET_FEED_POSTS: "/get_post_content",
    GET_POST_COMMENTS: "/get_comments",
    GET_ALL_EVENTS: "/get_events",
    GET_USER_GROUPS: "/get_user_groups",
    GET_NEW_GROUPS: "/get_groups_can_subscribe",
    SEARCH_LOCATION: "/search_location",
    ADD_POST: "/add_post",
    ADD_POST_CONTENT: "/add_post_content",
    ADD_EVENT: "/add_event",
	GET_DIRECT_FRIENDS: "/get_direct_friends",
    SEARCH_GROUPS: "/search_groups",
    GET_USER_POSTS: "/get_posts_user",
    ADD_COMMENT: "/add_comment",
    GET_LIKE_COUNT: "/get_like_count",
    GET_LIKED_USERS: "/get_users_like_post",
    ADD_LIKE: "/add_like",
    REMOVE_LIKE: "/delete_like",
    GET_GROUP_POSTS: "/get_group_posts",
    GET_GROUP_DETAILS: "/get_group_details",
    SEARCH_FRIENDS: "/search_friends",
    SEND_FRIEND_REQUEST: "/send_request",
    ACCEPT_FRIEND_REQUEST: "/accept_request",
    REMOVE_FRIEND: "/block_request",
    GET_TIMELINE: "/get_timeline"
} 

export const APP_URLS = {
    LOGIN: "/login",
    HOME: "/home",
}

export const ProfileRelation = {
    ME: 'me',
    FRIENDS: 'friends',
    REQUESTED: 'requested',
    RECEIVED: 'received',
    UNKNOWN: 'unknown',
    BLOCKED: 'blocked'
}

export default API;
