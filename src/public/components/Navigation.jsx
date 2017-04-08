import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand" >Automated Attendance</Link>
      </div>

      <div id="navbar" className="navbar-collaspe">
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/Student">Student</Link></li>
          <li><Link to="/Admin">Admin</Link></li>
          <li><Link to="/CameraPage">CameraPage</Link></li>
          <li><a href="/login">Log In</a></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;

