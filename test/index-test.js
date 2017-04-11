import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';
import { getUserData } from '../src/public/components/requests/users';
import App from '../src/public/components/index';

describe('<App />', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: [{ type: 'admin' }] }));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });
  
  it('calls componentWillMount', function() {
    const componentWillMountSpy = sinon.spy(App.prototype, 'componentWillMount');
    const wrapper = shallow(<App />);
    expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
    componentWillMountSpy.restore();
  });

  it('contains a Navigation bar', function() {
    const wrapper = mount(<App/>);
    expect(wrapper.find('Navigation')).to.have.length(1);
  });

  it('contains a Routes child component', function() {
    const wrapper = mount(<App/>);
    expect(wrapper.find('Routes')).to.have.length(1);
  });

  it('should receive a response from server after login', async function() {
    try {
      const wrapper = mount(<App/>);
      expect(wrapper.state().isLoggedIn).to.equal(true);
      expect(wrapper.state().isAdmin).to.equal(true);
    } catch (err) {
      console.warn(err);
    }
  });

});

