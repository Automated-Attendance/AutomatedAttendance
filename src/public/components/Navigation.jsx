import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userPrivs }) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand" >Automated Attendance</Link>
        </div>

        <div id="navbar" className="navbar-collaspe">
          <ul className="nav navbar-nav navbar-right">
            { userPrivs.isLoggedIn && !userPrivs.isAdmin && <li><Link to="/Student">Student</Link></li> }
            { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Admin">Admin</Link></li> }
            { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/CameraPage">CameraPage</Link></li> }
            { userPrivs.isLoggedIn && <li><a href="/logout">Logout</a></li> }
            { !userPrivs.isLoggedIn && <li><a href="/login">Login / Signup</a></li> }
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

