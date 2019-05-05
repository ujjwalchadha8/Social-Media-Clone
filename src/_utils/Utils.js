import DataManager from "../DataManager";
import { APP_URLS } from "../constants";

class Utils {
    static redirectTo(component, url) {
        component.props.history.push(url);
    }

    static requireActiveSession(component) {
        new DataManager().getSession((response) => {
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
}

export default Utils;