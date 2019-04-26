import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditProfile from "./profile/EditProfile";
import Login from './auth/Login'
import Register from './auth/Register';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ViewProfile from './profile/ViewProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div className="container"> 
            </div>
              <Route path="/login/" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/profile" exact component={ViewProfile}/>
              <Route path="/profile/edit" exact component={EditProfile}/>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
