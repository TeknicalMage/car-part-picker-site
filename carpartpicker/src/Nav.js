import { Link } from 'react-router-dom';
import Login from "./pages/login.js"



function Nav() {
    return (
      <nav>
        <ul className = "grid-container">
          <Link to='/Homepage' className=""  style={{ textDecoration: 'none' }}>
            <li className="">Home</li>
          </Link>
          <Link to='/Login' className="" style={{ textDecoration: 'none' }}>
            <li className="">Login</li>
          </Link>
          <Link to='/Profile' className=""  style={{ textDecoration: 'none' }}>
          <li className="">Profile</li>
          </Link>
          <Link to='/Signup' className=""  style={{ textDecoration: 'none' }}>
          <li className="">Sign up</li>
          </Link>
        </ul>
      </nav>
  
    )
  }
  
  
  
  export default Nav;
  