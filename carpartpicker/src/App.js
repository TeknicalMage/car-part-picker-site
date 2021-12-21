import React from "react";

import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";

import Nav from "./Nav";
import login from "./login"
import profile from "./profile"
import Acc from "./AccPage"
//Sign up Component
import Signup from "./signup";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./Dashboard";







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
        <Nav>
        </Nav>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component ={Dashboard}/>
          <Route path ="/Login" component ={login}/>
          <Route path ="/Profile" component ={profile}/>
          <Route path ="/Signup" component ={Acc}/>
          <Route path ="/Account" component ={profile}/>
        </Switch>
      </AuthProvider>

        </Router>




        
      </React.Fragment>
    );
  }
}

export default App;
