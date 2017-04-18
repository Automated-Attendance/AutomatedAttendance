import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Routes from '../src/public/components/Routes';

describe('<Routes />', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res('this is test data'));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should receive props', () => {
    const wrapper = shallow(<Routes userPrivs={admin}/>);
    expect(wrapper.instance().props.userPrivs.isLoggedIn).to.equal(true);
    expect(wrapper.instance().props.userPrivs.isAdmin).to.equal(true);
  });

});