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
}

export default Utils;