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
import { faThumbsUp, faMapMarker} from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsUp, faMapMarker)

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
            <Route path="/myprofile" exact component={ViewProfile}/>
            <Route path="/profile/:username" exact component={ViewProfile}/>
            <Route path="/mypofile/edit" exact component={EditProfile}/>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
