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
            { userPrivs.isLoggedIn && !userPrivs.isAdmin && <li><Link to="/Student">Attendance</Link></li> }
            { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Admin">Attendance</Link></li> }
            { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/CameraPage">Camera</Link></li> }
            { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Enrollment">Enrollment</Link></li> }
            { !userPrivs.isLoggedIn && <li><a href="/login">Login / Signup</a></li> }
            { userPrivs.isLoggedIn && <li><a href="/logout">Logout</a></li> }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

