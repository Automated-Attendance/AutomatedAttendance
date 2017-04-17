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
    const resolved = new Promise((res) => res({ data: [{ type: 'admin' }] }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should render with a webcam component view', () => {
    // const wrapper = shallow(<CameraPage/>);
    // expect(wrapper.find('Webcam')).to.have.length(1);
  });

});