import React from 'react';
import CameraPage from './components/CameraPage.jsx';
import Student from './components/Student.jsx';
import Admin from './components/Admin.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import AddStudent from './components/AddStudent.jsx';
import LoginRedirect from './components/LoginRedirect.jsx';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const Routes = ({ userAuth }) => {
  return (
     <div>
        <Route path="/About" component={About}/>
        <Route path="/Contact" component={Contact}/>
        <Route path="/Student" component={() => userAuth.loggedIn && !userAuth.admin ? <Student/> : <LoginRedirect userPrivs={userAuth}/> }/>
        <Route path="/CameraPage" component={() => userAuth.admin ? <CameraPage/> : <LoginRedirect userPrivs={userAuth}/> }/>
        <Route path="/Admin" component={() => userAuth.admin ? <Admin/> : <LoginRedirect userPrivs={userAuth}/> }/>
        <Route path="/AddStudent" component={() => userAuth.admin ? <AddStudent/> : <LoginRedirect userPrivs={userAuth}/> }/>
      </div>
  );
};

export default Routes;