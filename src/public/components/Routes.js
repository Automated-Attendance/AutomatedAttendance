import React from 'react';
import Camera from './Camera';
import Student from './Student';
import Admin from './Admin';
import About from './About';
import Contact from './Contact';
import Enrollment from './Enrollment';
import LoginRedirect from './LoginRedirect';
import Landing from './LandingPage/LandingIndex';
import {Route} from 'react-router-dom';

const Routes = ({userPrivs, toggleSpinner}) => {
  /* istanbul ignore next */
  return (
    <div>
      <Route exact path="/" component={Landing}/>
      <Route path="/About" component={About}/>
      <Route path="/Contact" component={Contact}/>
      <Route path="/Student" component={() => userPrivs.isLoggedIn && !userPrivs.isAdmin ? <Student userPrivs={userPrivs}/> : <LoginRedirect userPrivs={userPrivs}/>}/>
      <Route path="/Camera" component={() => userPrivs.isAdmin ? <Camera toggleSpinner={toggleSpinner}/> : <LoginRedirect userPrivs={userPrivs}/>}/>
      <Route path="/Admin" component={() => userPrivs.isAdmin ? <Admin/> : <LoginRedirect userPrivs={userPrivs}/>}/>
      <Route path="/Enrollment" component={() => userPrivs.isAdmin ? <Enrollment toggleSpinner={toggleSpinner}/> : <LoginRedirect userPrivs={userPrivs}/>}/>
    </div>
  );
};

export default Routes;