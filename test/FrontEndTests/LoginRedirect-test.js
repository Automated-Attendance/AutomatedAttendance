import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router-dom';
import LoginRedirect from '../../src/public/components/LoginRedirect';


describe('<LoginRedirect />', function() {

  const loggedIn = {
    isLoggedIn: true,
    isAdmin: true
  };

  const notLoggedIn = {
    isLoggedIn: false,
    isAdmin: false
  };

  it('should receive props', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={loggedIn}/>);
    const userPrivs = wrapper.instance().props.userPrivs;
    expect(userPrivs).to.exist;
    expect(userPrivs.isLoggedIn).to.exist;
    expect(userPrivs.isAdmin).to.exist;
  });

  it('should render forbidden access Link if logged in and not adequate privileges', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={loggedIn}/>);
    expect(wrapper.contains(
      <div className="error-details">
        You do not have privileges to access this page.
      </div>)).to.equal(true);
  });

  it('should not render forbidden access Link if not logged in', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={notLoggedIn}/>);
    expect(wrapper.contains(
      <div className="error-details">
        You don't have correct privileges to acces this page.
      </div>)).to.equal(false);
  });

  it('should render login Link if not logged in', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={notLoggedIn}/>);
    expect(wrapper.contains(<a href="/login" className="login-button btn btn-primary btn-lg">
      <span className="glyphicon glyphicon-user">
      </span> Log Me In </a>)).to.equal(true);
  });

  it('should not render login Link if logged in', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={loggedIn}/>);
    expect(wrapper.contains(
      <a href="/login" className="login-button btn btn-primary btn-lg">
      <span className="glyphicon glyphicon-user"></span> Log Me In </a>)).to.equal(false);
  });

});