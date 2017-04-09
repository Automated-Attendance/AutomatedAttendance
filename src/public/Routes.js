import React from 'react';
import CameraPage from './components/CameraPage';
import Student from './components/Student';
import Admin from './components/Admin';
import About from './components/About';
import Contact from './components/Contact';
import AddStudent from './components/AddStudent';
import LoginRedirect from './components/LoginRedirect';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const Routes = ({ userPrivs }) => {
  return (
    <div>
      <Route path="/About" component={About}/>
      <Route path="/Contact" component={Contact}/>
      <Route path="/Student" component={() => userPrivs.isLoggedIn && !userPrivs.isAdmin ? <Student/> : <LoginRedirect userPrivs={userPrivs}/> }/>
      <Route path="/CameraPage" component={() => userPrivs.isAdmin ? <CameraPage/> : <LoginRedirect userPrivs={userPrivs}/> }/>
      <Route path="/Admin" component={() => userPrivs.isAdmin ? <Admin/> : <LoginRedirect userPrivs={userPrivs}/> }/>
      <Route path="/AddStudent" component={() => userPrivs.isAdmin ? <AddStudent/> : <LoginRedirect userPrivs={userPrivs}/> }/>
    </div>
  );
};

export default Routes;