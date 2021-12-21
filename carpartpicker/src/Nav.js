import { Link } from 'react-router-dom';
import './Nav.css';



function Nav() {
    return (
      
      <nav>
        <ul className = "grid-container">
          <Link to='/Homepage' className="grid-item"  style={{ textDecoration: 'none' }}>
            <li className="">Home</li>
          </Link>
          <Link to='/Login' className="grid-item" style={{ textDecoration: 'none' }}>
            <li className="">Login</li>
          </Link>
          <Link to='/Profile' className="grid-item"  style={{ textDecoration: 'none' }}>
          <li className="">Profile</li>
          </Link>
          <Link to='/Signup' className="grid-item" style={{ textDecoration: 'none' }}>
          <li className="">Sign up</li>
          </Link>
          <Link to='/Account' className="grid-item" style={{ textDecoration: 'none' }}>
          <li className="">Account</li>
          </Link>
        </ul>
      </nav>
  
    )
  }
  
  
  
  export default Nav;
  