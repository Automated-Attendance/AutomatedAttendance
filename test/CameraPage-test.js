import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import CameraPage from '../src/public/components/CameraPage';

describe('<CameraPage />', function() {


  it('should render with a webcam component view', () => {
    const wrapper = shallow(<CameraPage/>);
    expect(wrapper.find('Webcam')).to.have.length(1);
  });

  it('should call takeScreenshot on click', () => {
    const testFn = spy(CameraPage.prototype, 'takeScreenshot');
    const wrapper = mount(<CameraPage />);
    expect(testFn.called).to.equal(false);
    wrapper.find('button').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should call uploadToCloudinary on click', () => {
    const testFn = spy(CameraPage.prototype, 'uploadToCloudinary');
    const wrapper = mount(<CameraPage />);
    expect(testFn.called).to.equal(false);
    wrapper.find('button').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should not have img node when no screenshot has been stored', () => {
    const wrapper = shallow(<CameraPage />);
    expect(wrapper.find('img')).to.have.length(0);
  });

});