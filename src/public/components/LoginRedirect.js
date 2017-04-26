import React from 'react';

const LoginRedirect = ({userPrivs}) => {
  if (userPrivs.isAdmin || userPrivs.isLoggedIn) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>Access Denied</h2>
              <div className="error-details">
                You do not have privileges to access this page.
              </div>
              <div className="error-actions">
                <a href="/" className="login-button btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>Take Me Home</a>
                <a href="/Contact" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span>Contact Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>Access Denied</h2>
              <div className="error-details">
                Are you logged in? 
              </div>
              <div className="error-actions">
                <a href="/login" className="login-button btn btn-primary btn-lg"><span className="glyphicon glyphicon-user"></span> Log Me In </a>
                <a href="/Contact" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginRedirect;