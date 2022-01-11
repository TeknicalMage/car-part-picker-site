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
        </Switch>
      </AuthProvider>

        </Router>




        
      </React.Fragment>
    );
  }
}

export default App;
