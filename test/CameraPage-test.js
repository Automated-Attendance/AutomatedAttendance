import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import CameraPage from '../src/public/components/CameraPage';

describe('<CameraPage />', function() {

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
    const wrapper = shallow(<CameraPage/>);
    expect(wrapper.find('Webcam')).to.have.length(1);
  });

  it('should call takeScreenshot on click', () => {
    const testFn = sinon.spy(CameraPage.prototype, 'takeScreenshot');
    const wrapper = mount(<CameraPage />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.screenShotButton').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should call testBundle on click', () => {
    const testFn = sinon.spy(CameraPage.prototype, 'testBundle');
    const wrapper = mount(<CameraPage />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.screenShotButton').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should not have img node when no screenshot has been stored', () => {
    const wrapper = shallow(<CameraPage />);
    expect(wrapper.find('img')).to.have.length(0);
  });

});