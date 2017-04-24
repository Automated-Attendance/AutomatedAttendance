import React from 'react';
import CameraPage from './CameraPage';
import Student from './Student';
import Admin from './Admin';
import About from './About';
import Contact from './Contact';
import Enrollment from './Enrollment';
import LoginRedirect from './LoginRedirect';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const Routes = ({ userPrivs }) => {
  /* istanbul ignore next */
  return (
    <div>
      <Route exact path="/" component={About}/>
      <Route path="/Student" component={() => userPrivs.isLoggedIn && !userPrivs.isAdmin ? <Student userPrivs={userPrivs}/> : <LoginRedirect userPrivs={userPrivs}/> }/>
      <Route path="/CameraPage" component={() => userPrivs.isAdmin ? <CameraPage/> : <LoginRedirect userPrivs={userPrivs}/> }/>
      <Route path="/Admin" component={() => userPrivs.isAdmin ? <Admin/> : <LoginRedirect userPrivs={userPrivs}/> }/>
      <Route path="/Enrollment" component={() => userPrivs.isAdmin ? <Enrollment/> : <LoginRedirect userPrivs={userPrivs}/> }/>

    </div>
  );
};

export default Routes;