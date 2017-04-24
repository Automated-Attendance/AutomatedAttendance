import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userPrivs }) => {
  return (


<nav className="navbar navbar-fixed-top navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/">Automated Attendance</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li><a href="#"><span className="glyphicon glyphicon-th" aria-hidden="true"></span> Dashboard</a></li>
        { userPrivs.isLoggedIn && !userPrivs.isAdmin && <li><Link to="/Student">Attendance</Link></li> }
        { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Admin">Attendance</Link></li> }
        { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/CameraPage">Camera</Link></li> }
        { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Enrollment">Enrollment</Link></li> }
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        { !userPrivs.isLoggedIn && <li><a href="/login"><span className="glyphicon glyphicon-user" aria-hidden="true"/>Login</a></li> }
        { userPrivs.isLoggedIn && <li><a href="/logout"><span className="glyphicon glyphicon-user" aria-hidden="true"/>Logout</a></li> }
      </ul>
    </div>
  </div>
</nav>


  );
};

export default Navigation;


// <nav className="navbar navbar-inverse navbar-fixed-top">
//       <div className="container">
//         <div className="navbar-header">
//           <Link to="/" className="navbar-brand" >Automated Attendance</Link>
//         </div>

//         <div id="navbar" className="navbar-collaspe">
//           <ul className="nav navbar-nav navbar-right">
//             { userPrivs.isLoggedIn && !userPrivs.isAdmin && <li><Link to="/Student">Attendance</Link></li> }
//             { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Admin">Attendance</Link></li> }
//             { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/CameraPage">Camera</Link></li> }
//             { userPrivs.isLoggedIn && userPrivs.isAdmin && <li><Link to="/Enrollment">Enrollment</Link></li> }
//             <li><Link to="/About">About</Link></li>
//             <li><Link to="/Contact">Contact</Link></li>
//             { !userPrivs.isLoggedIn && <li><a href="/login">Login / Signup</a></li> }
//             { userPrivs.isLoggedIn && <li><a href="/logout">Logout</a></li> }
//           </ul>
//         </div>
//       </div>
//     </nav>
