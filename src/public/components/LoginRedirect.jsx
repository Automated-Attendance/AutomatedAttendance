import React from 'react';
import { Link } from 'react-router-dom';

const LoginRedirect = ({ loginData }) => {
  if (loginData.admin || loginData.loggedIn) {
    return (
      <div>
        <Link to="/">You don't have correct access to view this page. 
          <button>Click to go home.</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>You must login to view this page</h1>
        <a href="/login"><button>Login</button></a>
      </div>
    );
  }
};

export default LoginRedirect;
