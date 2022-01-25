import React from "react";

import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap"

import Nav from "./Nav";
import Login from "./Login"
import profile from "./profile"
import Acc from "./AccPage"


//Sign up Component
import Signup from "./signup";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile"
import $ from "jquery";







class App extends React.Component {
    constructor(props) {
        super(props);






        this.state = {
            developers: []
        };


    }




    render() {
        const { developers } = this.state;

        return (




          <React.Fragment>

   

        

          <Router>
          
        <AuthProvider>
          <Nav>
          </Nav>
          <Switch>
            <Route path ="/Login" component ={Login}/>
            <Route path ="/Profile" component ={Dashboard}/>
            <Route path ="/Signup" component ={Acc}/>
            <Route path ="/Account" component ={profile}/>
            <Route path ="/update-profile" component ={UpdateProfile}/>
            {/*<Route path ="/Carmodder" component ={carmodder}/>*/}
          </Switch>
        </AuthProvider>
  
          </Router>
  
  
  
  
          
        </React.Fragment>
      );
    }

    componentDidMount() {
        // console.log("Works");
        // $('.toggle-button').on('hover', function() {
        //     console.log("Works1");
        //     $('.left-sidebar').toggleClass('minimize');
        // });
        //
        // $('.user-profile').on('click', function() {
        //     console.log("Works1");
        //     $('.left-sidebar').toggleClass('minimize');
        // });
        //
        // $('.close-chat-btn').on('click', function() {
        //     console.log("Works1");
        //     $('.direct-messaging ').addClass('minimize');
        // });
        //
        // $('.open-chat-btn').on('click', function() {
        //     console.log("Works1");
        //     $('.direct-messaging ').toggleClass('minimize');
        // });
        //
        // $('.open-music-btn').on('click', function() {
        //     console.log("Works1");
        //     $('.music-player').toggleClass('show');
        // });
        //
        // $('.open-timer-btn').on('click', function() {
        //     console.log("Works1");
        //     $('.timer-display').toggleClass('show');
        // });
    }
  }
  
  export default App;