import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

 

  

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

    if (currentUser == null) {
    return(
      <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Successfully Logged Out</h2>
        </Card.Body>
        </Card>
      </>
    )
    } else if(currentUser.emailVerified) {

    return (
      <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert Sariant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <strong>ALL INFO:</strong> {currentUser.photoURL}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      </>
    )
    } else {
      return(
        <Card>
         <p>Account Not verified</p> 
         <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        </Card>

        
        
      )
    }
  }

  
  
