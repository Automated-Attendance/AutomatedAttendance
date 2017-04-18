import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router-dom';
import LoginRedirect from '../src/public/components/LoginRedirect';


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
      <Link to="/">You don't have correct access to view this page. 
        <button>Click to go home.</button>
      </Link>)).to.equal(true);
  });

  it('should not render forbidden access Link if not logged in', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={notLoggedIn}/>);
    expect(wrapper.contains(
      <Link to="/">You don't have correct access to view this page. 
        <button>Click to go home.</button>
      </Link>)).to.equal(false);
  });

  it('should render login Link if not logged in', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={notLoggedIn}/>);
    expect(wrapper.contains(<a href="/login">login</a>)).to.equal(true);
  });

  it('should not render login Link if logged in', () => {
    const wrapper = shallow(<LoginRedirect userPrivs={loggedIn}/>);
    expect(wrapper.contains(<a href="/login"><button>Login</button></a>)).to.equal(false);
  });

});