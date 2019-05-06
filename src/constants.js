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
