import React from "react";

import Firebase from "firebase";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";

import config from "./config.js";

import Nav from "./Nav";
import login from "./pages/login"
import profile from "./pages/profile" 





class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    
    


    this.state = {
      developers: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let role = this.refs.role.value;
    let uid = this.refs.uid.value;

    if (uid && name && role) {
      const { developers } = this.state;
      const devIndex = developers.findIndex(data => {
        return data.uid === uid;
      });
      developers[devIndex].name = name;
      developers[devIndex].role = role;
      this.setState({ developers });
    } else if (name && role) {
      const uid = new Date().getTime().toString();
      const { developers } = this.state;
      developers.push({ uid, name, role });
      this.setState({ developers });
    }

    this.refs.name.value = "";
    this.refs.role.value = "";
    this.refs.uid.value = "";
  };

  removeData = developer => {
    const { developers } = this.state;
    const newState = developers.filter(data => {
      return data.uid !== developer.uid;
    });
    this.setState({ developers: newState });
  };

  updateData = developer => {
    this.refs.uid.value = developer.uid;
    this.refs.name.value = developer.name;
    this.refs.role.value = developer.role;
  };

  render() {
    const { developers } = this.state;
    return (
      <React.Fragment>

        <Router>
        <Nav>
        </Nav>

        <Switch>
          <Route path ="/Login" component ={login}/>
          <Route path ="/Profile" component ={profile}/>
        </Switch>


        </Router>




        
      </React.Fragment>
    );
  }
}

export default App;
