import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import profile from "./profile";
import Firebase from "firebase";


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
        <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>
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
                    <input type="email" className="form-control" placeholder="Enter email" ref="email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref="password"/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>

        <div className="row">
            <div className="col-xl-12">
              {developers.map(developer => (
                <div
                  key={developer.uid}
                  className="card float-left"
                  style={{ width: "18rem", marginRight: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{developer.name}</h5>
                    <p className="card-text">{developer.role}</p>
                    <button
                      onClick={() => this.removeData(developer)}
                      className="btn btn-link"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.updateData(developer)}
                      className="btn btn-link"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        

        </div>

        

        

    );
      <React.Fragment><profile></profile></React.Fragment>
    
}


}
export default Item;
