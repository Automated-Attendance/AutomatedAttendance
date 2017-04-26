import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Admin from '../../src/public/components/Admin';

describe('<Admin />', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const attendanceData = JSON.parse('[{"attendance_record_id":1,"date":"2017-04-18T04:21:50.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":1,"users_id":1,"user_name":"hanzh","first_name":"Han","last_name":"Zhao","email":"hanshengzhao1993@gmail.com","photo":null,"type":"student","id":1,"class_id":1,"classes_id":1,"class_name":"HRSF72"},{"attendance_record_id":2,"date":"2017-04-18T04:21:50.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":2,"users_id":2,"user_name":"andrewaaalonis","first_name":"Andrew","last_name":"Alonis","email":"andrew@gmail.com","photo":null,"type":"student","id":2,"class_id":1,"classes_id":1,"class_name":"HRSF72"},{"attendance_record_id":3,"date":"2017-04-18T04:21:50.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":3,"users_id":3,"user_name":"Duy12312313","first_name":"Duy","last_name":"Nguyen","email":"duyng92@gmail.com","photo":null,"type":"student","id":4,"class_id":2,"classes_id":2,"class_name":"HRSF76"},{"attendance_record_id":4,"date":"2017-04-18T04:21:51.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":4,"users_id":4,"user_name":"Jukejc","first_name":"Jason","last_name":"Chambers","email":"jas.o.chambers@gmail.com","photo":null,"type":"admin","id":3,"class_id":1,"classes_id":1,"class_name":"HRSF72"},{"attendance_record_id":5,"date":"2017-04-18T04:25:12.000Z","checkin_time":"2017-04-26T09:30:00-07:00","status":"Pending","user_id":5,"users_id":5,"user_name":"AADevStudent","first_name":"aadevstudent@gmail.com","last_name":"undefined","email":"aadevstudent@gmail.com","photo":"http://res.cloudinary.com/automatedattendance/image/upload/v1492489476/AADevStudent.png","type":"student","id":5,"class_id":1,"classes_id":1,"class_name":"HRSF72"}]');
    const resolved = new Promise((res) => res({ data: attendanceData }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('calls componentWillMount', async function() {
    const componentWillMountSpy = sinon.spy(Admin.prototype, 'componentWillMount');
    const wrapper = mount(<Admin />);
    expect(Admin.prototype.componentWillMount.calledOnce).to.equal(true);
    componentWillMountSpy.restore();
  });

  it('should have a table', () => {
    const wrapper = mount(<Admin/>);
    expect(wrapper.find('BootstrapTable')).to.have.length(1);
  });
  
  it('should have six columns in the table', () => {
    const wrapper = mount(<Admin/>);
    expect(wrapper.find('TableHeaderColumn')).to.have.length(6);
  });

  it('should render a classes attendance records', () => {
    const wrapper = mount(<Admin/>);
    setTimeout(() => expect(wrapper.state().attendance).to.have.length(1), 2000);
  });

  it('Should have five buttons', () => {
    const wrapper = mount(<Admin/>);
    wrapper.find('.login-button').simulate('click');
    expect(wrapper.find('button')).to.have.length(5);
  });

  it('should delete attendance record on click', () => {
    const testFn = sinon.spy(Admin.prototype, 'deleteRecord');
    const wrapper = mount(<Admin/>);
    wrapper.find('.login-button').simulate('click');
    expect(testFn.called).to.equal(false);
    wrapper.find('.deleteRecord').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should call handleUpdateStatusSubmit on button click', () => {
    const testFn = sinon.spy(Admin.prototype, 'handleUpdateStatusSubmit');
    const wrapper = mount(<Admin />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.login-button').simulate('click');
    wrapper.find('.handleUpdateStatusSubmit').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();  
  });

  it('should change records on button click', () => {
    const testFn = sinon.spy(Admin.prototype, 'handleUpdateStatusSubmit');
    const wrapper = mount(<Admin />);
    wrapper.find('.login-button').simulate('click');
    const andrew = {
      label: "Andrew Alonis - andrewaaalonis",
      value: "andrewaaalonis"
    }
    wrapper.setState({ selectedStudent : andrew})
    wrapper.setState({ selectedStatus: 'On time' });
    wrapper.setState({ selectedDate: "2017-04-17 16:01:00" })
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleUpdateStatusSubmit').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();  
  });

   it('should update state when unmounted', () => {
    const testFn = sinon.spy(Admin.prototype, 'componentWillUnmount');
    const wrapper = mount(<Admin />);
    wrapper.unmount();
    setTimeout(() => {
      expect(clearInterval.calledOnce).to.equal(true);
    }, 1000);
  });

});
