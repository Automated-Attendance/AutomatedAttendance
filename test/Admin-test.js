import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Admin from '../src/public/components/Admin';

describe('<Admin />', function() {

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

  it('should initialize states from the database', () => {

  });
  it('should return a Date object', () => {

  });
  it('should convert month from number to string', () => {

  });
  it('should convert day from number to string', () => {

  });
  it('should format date to string', () => {

  });
  it('should sort full names by last name and then first name', () => {

  });

});