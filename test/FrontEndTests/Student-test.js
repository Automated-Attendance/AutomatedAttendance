import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Student from '../../src/public/components/Student';

describe('<Student />', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const records = JSON.parse('[{"attendance_record_id":1,"date":"2017-04-18T04:21:50.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":1,"users_id":1,"user_name":"hanzh","first_name":"Han","last_name":"Zhao","email":"hanshengzhao1993@gmail.com","photo":null,"type":"student","id":1,"class_id":1,"classes_id":1,"class_name":"HRSF72"},{"attendance_record_id":2,"date":"2017-04-18T04:21:50.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":2,"users_id":2,"user_name":"andrewaaalonis","first_name":"Andrew","last_name":"Alonis","email":"andrew@gmail.com","photo":null,"type":"student","id":2,"class_id":1,"classes_id":1,"class_name":"HRSF72"},{"attendance_record_id":3,"date":"2017-04-18T04:21:50.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":3,"users_id":3,"user_name":"Duy12312313","first_name":"Duy","last_name":"Nguyen","email":"duyng92@gmail.com","photo":null,"type":"student","id":4,"class_id":2,"classes_id":2,"class_name":"HRSF76"},{"attendance_record_id":4,"date":"2017-04-18T04:21:51.000Z","checkin_time":"Mon Apr 17 2017 21:21:50 GMT-0700 (PDT)","status":"Pending","user_id":4,"users_id":4,"user_name":"Jukejc","first_name":"Jason","last_name":"Chambers","email":"jas.o.chambers@gmail.com","photo":null,"type":"admin","id":3,"class_id":1,"classes_id":1,"class_name":"HRSF72"},{"attendance_record_id":5,"date":"2017-04-18T04:25:12.000Z","checkin_time":"2017-04-26T09:30:00-07:00","status":"Pending","user_id":5,"users_id":5,"user_name":"AADevStudent","first_name":"aadevstudent@gmail.com","last_name":"undefined","email":"aadevstudent@gmail.com","photo":"http://res.cloudinary.com/automatedattendance/image/upload/v1492489476/AADevStudent.png","type":"student","id":5,"class_id":1,"classes_id":1,"class_name":"HRSF72"}]');
    const resolved = new Promise((res) => res({ data: records }));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const userPrivs = {
    userEmail: 'aadevstudent@gmail.com'
  };

  it('calls componentWillMount', async function() {
    const componentWillMountSpy = sinon.spy(Student.prototype, 'componentWillMount');
    const wrapper = mount(<Student />);
    expect(Student.prototype.componentWillMount.calledOnce).to.equal(true);
    componentWillMountSpy.restore();
  });

  it('calls componentWillUnmount', async function() {
    const componentWillUnmountSpy = sinon.spy(Student.prototype, 'componentWillUnmount');
    const wrapper = mount(<Student />);
    wrapper.unmount();
    expect(Student.prototype.componentWillUnmount.calledOnce).to.equal(true);
    componentWillUnmountSpy.restore();
  });

   it('should update state when unmounted', () => {
    const testFn = sinon.spy(Student.prototype, 'componentWillUnmount');
    const wrapper = mount(<Student />);
    wrapper.unmount();
    // setTimeout(() => {
    //   expect(clearInterval.calledOnce).to.equal(true);
    // }, 1000);
  });

  it('render a students attendance record', async function() {
    const wrapper = mount(<Student />);
    // setTimeout(() => expect(wrapper.state().attendance).to.have.length(1), 2000);
  });

  it('sets attendanceInterval', async function() {
    const getAttendanceSpy = sinon.spy(Student.prototype, 'getAttendance');
    const wrapper = mount(<Student />);
    // setTimeout(() => expect(wrapper.state().attendanceInterval).to.not.equal(null), 2000);
    getAttendanceSpy.restore();
  });

  it('should have a table', () => {
    const wrapper = mount(<Student/>);
    expect(wrapper.find('BootstrapTable')).to.have.length(1);
  });
  
  it('should have five columns in the table', () => {
    const wrapper = mount(<Student/>);
    expect(wrapper.find('TableHeaderColumn')).to.have.length(5);
  });

  it('should render a classess attendance records', function(done) {
    this.timeout(8000);
    const wrapper = mount(<Student userPrivs={{ userEmail: 'test@test.com' }}/>);
    setTimeout(() => done(), 5500);

  });

});