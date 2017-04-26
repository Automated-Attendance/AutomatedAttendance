import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import ToggleStatus from '../../src/public/components/ToggleStatus';

describe('<ToggleStatus/> handleSubmitToggleStatus()', () => {

  // it ('should call handleSubmitToggleStatus on form click', () => {
  //   const testFn = sinon.spy(ToggleStatus.prototype, 'handleSubmitToggleStatus');
  //   const wrapper = mount(<ToggleStatus/>);
  //   wrapper.setState({selectedStudentToggleStatus: {label: 'Duy Nguyen - nguyenaiden' , value: 'nguyenaiden'}, selectedToggleStatus: 'Student'});
  //   expect(testFn.called).to.equal(false);
  //   wrapper.find('.handleSubmitToggleStatus').simulate('click');
  //   expect(testFn.called).to.equal(true);
  //   testFn.restore();
  // });

  // it ('should not toggle status if states are empty', () => {
  //   const testFn = sinon.spy(ToggleStatus.prototype, 'handleSubmitToggleStatus');
  //   const wrapper = shallow(<ToggleStatus/>);
  //   wrapper.find('.handleSubmitToggleStatus').simulate('click');
  //   expect(wrapper.state().studentStatusToggled).to.equal(false);
  //   testFn.restore();
  // });

});