import { Link } from 'react-router-dom';
import './Nav.css';
import React, { useState, useContext } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./contexts/AuthContext"
import { useHistory } from "react-router-dom"

export function Nav() {
  const { currentUser } = useAuth()
  


  

  if (currentUser == null){
    console.log('No user defined')
    return(
      <nav>
        <ul className="grid-container">
          <Link to='/Homepage' className="grid-item" style={{ textDecoration: 'none' }}>
            <li className="">Home</li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Login' className="grid-item_r" style={{ textDecoration: 'none' }}>
            <li className="">Login</li>
          </Link>
          <Link to='/Signup' className="grid-item_r" style={{ textDecoration: 'none' }}>
            <li className="">Sign up</li>
          </Link>
          <Link to='/Account' className="grid-item_r" style={{ textDecoration: 'none' }}>
            <li className="">Account</li>
          </Link>
        </ul>
      </nav>
    )
  }
else {

    return (
      <nav>
        <ul className="grid-container">
          <Link to='/Homepage' className="grid-item" style={{ textDecoration: 'none' }}>
            <li className="">Home</li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""> </li>
          </Link>
          <Link to='/Homepage' className="grid-item_e" style={{ textDecoration: 'none' }}>
            <li className=""></li>
          </Link>
          <Link to='/Profile' className="grid-item_r" style={{ textDecoration: 'none' }}>
            <li className="">Profile</li>
          </Link>
          <Link to='/Account' className="grid-item_r" style={{ textDecoration: 'none' }}>
            <li className="">Account</li>
          </Link>
        </ul>
      </nav>
    )

  }



}

export default Nav;
