import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import profile from "../profile";
import Firebase from "firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



//import App from "./app.js";
// import { database, auth, googleAuthProvider, storage } from 'firebase';const auth = app.auth();
 
//import {firebase} from "../firebase.js"


//const auth = Firebase.auth(App);

//const signUpFunction = (em, pa) => {
 // const email = em;
 // const password = pa;

 // auth.createUserWithEmailAndPassword(email, password)
 // .then(() => {
  //    console.log("Signed Up Successfully");
  //    window.location.assign('../Profile');
 // })
 // .catch(error => {
   //     console.error(error);
 // })
//}

//const sendVerificationEmail = () => {
  //Built in firebase function responsible for sending the verification email
//  auth.currentUser.sendEmailVerification()
//  .then(() => {
 //     console.log('Verification Email Sent Successfully !');
      //redirecting the user to the profile page once everything is done correctly
 //     window.location.assign('../Profile');
 // })
 // .catch(error => {
 //     console.error(error);
 // })
//}



class Item extends Component {
  constructor(props) {
    super(props);
    
    
    


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

    let uid = this.refs.uid.value;
    let firstname = this.refs.firstname.value;
    let lastname = this.refs.lastname.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    if (uid && firstname && lastname && email && password) {
      const { developers } = this.state;
      const devIndex = developers.findIndex(data => {
        return data.uid === uid;
      });
      developers[devIndex].firstname = firstname;
      developers[devIndex].lastname = lastname;
      developers[devIndex].email = email;
      developers[devIndex].password = password;
      this.setState({ developers });
    } else if (firstname && lastname && email && password) {
      const uid = new Date().getTime().toString();
      const { developers } = this.state;
      developers.push({ firstname, lastname, email, password });
      this.setState({ developers });
    }

    this.refs.firstname.value = "";
    this.refs.lastname.value = "";
    this.refs.email.value = "";
    this.refs.password.value = "";
    this.refs.uid.value = "";

    //signUpFunction(email, password);
  };

 
  updateData = developer => {
    this.refs.uid.value = developer.uid;
    this.refs.firstname.value = developer.firstname;
    this.refs.lastname.value = developer.lastname;
    this.refs.email.value = developer.email;
    this.refs.password.value = developer.password;
  };
  


   
          render() {
    const { developers } = this.state;
    return (

        <div>
        <script src="/__/firebase/6.2.4/firebase-app.js"></script>
        <script src="/__/firebase/6.2.4/firebase-auth.js"></script>
        <form onSubmit={this.handleSubmit}>
                <h3> </h3>
                <input type="hidden"  ref="uid"/>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" ref="firstname" />
                </div>
            
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" ref="lastname" />
                </div>

              <div className="form-group">
                    <label>Email</label>
                    <input type="email"  id = "email" className="form-control" placeholder="Enter email" ref="email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id = "password" className="form-control" placeholder="Enter password" ref="password"/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" ref = "id">Register</button>
                <p className="forgot-password text-right">
                    Already registered  <a href="#">log in?</a>
                </p>
        </form>
        <script>
          
        
        </script>


  </div>

        

        

    );
      
    
}


}
export default Item;

