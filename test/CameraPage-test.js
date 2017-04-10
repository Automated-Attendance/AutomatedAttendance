import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import CameraPage from '../src/public/components/CameraPage';

describe('<CameraPage />', function() {

  it('should render with a webcam component view', () => {
    const wrapper = shallow(<CameraPage/>);
  });

});