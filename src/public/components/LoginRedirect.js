import React from 'react';
import { Link } from 'react-router-dom';

const LoginRedirect = ({ userPrivs }) => {
  if (userPrivs.isAdmin || userPrivs.isLoggedIn) {
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
        <h3>You must <a href="/login">login</a> to view this page</h3>
      </div>
    );
  }
};

export default LoginRedirect;
