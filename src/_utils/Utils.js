import DataManager from "../DataManager";
import { APP_URLS } from "../constants";

class Utils {
    static redirectTo(component, url) {
        if (component.props.history) {
          component.props.history.push(url);
        } else {
          window.location.href = url;
        }
    }

    static requireActiveSession(component) {
        let dataManager =  new DataManager();
        dataManager.getSession((response) => {
            dataManager.getProfile(null, () => {}, (error) => {
               if (error.responseJSON.reason == 'PROFILE_NOT_FOUND') {
                 Utils.redirectTo(component, '/myprofile/edit')
               }
            })
            return;
        }, (error) => {
            switch (error.responseJSON.reason) {
                case "SESSION_EXPIRED":
                    Utils.activateSession(component);
                    break;
                default:
                    console.error(error);
            }
            
        });
    }

    static activateSession(component) {
        Utils.redirectTo(component, APP_URLS.LOGIN + '?redirectUrl='  
                + encodeURIComponent(window.location.pathname + window.location.search));
    }

    static createDateAsUTC(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
    
    static convertDateToUTC(date) { 
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
    }

    static getAgoTimestamp(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = Math.floor(seconds / 31536000);
      
        if (interval > 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }
}

export default Utils;