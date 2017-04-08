import React from 'react';

const LoginRedirect = () => {
  return (
    <div>
      <h1>You must login to view this page</h1>
      <a href="/login"><button>Login</button></a>
    </div>
  );
};

export default LoginRedirect;
