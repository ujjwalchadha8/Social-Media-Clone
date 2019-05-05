import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import EditProfile from "./profile/EditProfile";
import Login from './auth/Login'
import Register from './auth/Register';
import ViewProfile from './profile/ViewProfile';
import Home from './home/Home';
import Logout from './auth/Logout';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery'
import 'bootstrap/dist/js/bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faMapMarker, faCalendar} from '@fortawesome/free-solid-svg-icons'
import Events from './events/Events';
import Groups from './groups/Groups';
import GroupView from './groups/GroupView';

library.add(faThumbsUp, faMapMarker, faCalendar)

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div className="container"> </div>
            <Route path="/" exact render={() => <Redirect to="/home"/>}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/events" exact component={Events}/>
            <Route path="/myprofile" exact component={ViewProfile}/>
            <Route path="/profile/:username" exact component={ViewProfile}/>
            <Route path="/profile/:username/:tabname" exact component={ViewProfile}/>
            <Route path="/mypofile/edit" exact component={EditProfile}/>
            <Route path="/groups" exact component={Groups} />
            <Route path="/groups/:groupid" exact component={GroupView}/>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
