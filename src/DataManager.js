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

    getProfile(successCallback, errorCallback) {
        $.get(API.BASE_URL + API.GET_PROFILE, null, (response) => {
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

}

export default DataManager;