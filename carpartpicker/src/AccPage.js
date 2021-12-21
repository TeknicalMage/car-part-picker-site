import React, { useRef, useState } from "react"
import { Form, Button, Card, Container} from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext";

import Signup from "./signup"

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

        <AuthProvider>
        <div className="w-100">
        <Container classname = "d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
          <Signup/>
        </Container>
        



        </div>
        </AuthProvider>
        
      </React.Fragment>
    );
  }
}

export default App;
