import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Student from '../src/public/components/Student';

describe('<Student />', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: [{ type: 'admin' }] }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should have a table', () => {
    const wrapper = mount(<Student/>);
    expect(wrapper.find('BootstrapTable')).to.have.length(1);
  });

  it('should have four columns in the table', () => {
    const wrapper = mount(<Student/>);
    expect(wrapper.find('TableHeaderColumn')).to.have.length(4);
  });
});