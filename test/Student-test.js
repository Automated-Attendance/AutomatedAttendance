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
    const parsedRecords = JSON.parse('[{"attendance_record_id":5,"date":"2017-04-18T04:25:12.000Z","checkin_time":"2017-04-26T09:30:00-07:00","status":"Pending","user_id":5,"users_id":5,"user_name":"AADevStudent","first_name":"aadevstudent@gmail.com","last_name":"undefined","email":"aadevstudent@gmail.com","photo":"http://res.cloudinary.com/automatedattendance/image/upload/v1492489476/AADevStudent.png","type":"student","id":5,"class_id":1,"classes_id":1,"class_name":"HRSF72"}]');
    const resolved = new Promise((res) => res({ data: parsedRecords }));
    sandbox.stub(axios, 'get').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const userPrivs = {
    userEmail: 'aadevstudent@gmail.com'
  };

  it('should have a table', function() {
    const wrapper = mount(<Student userPrivs={userPrivs}/>);
    expect(wrapper.find('BootstrapTable')).to.have.length(1);
  });

  it('should have four columns in the table', function() {
    const wrapper = mount(<Student userPrivs={userPrivs}/>);
    expect(wrapper.find('TableHeaderColumn')).to.have.length(4);
  });

  it('should render a students attendance records', function() {
    const wrapper = mount(<Student userPrivs={userPrivs}/>);
    setTimeout(() => {
      expect(wrapper.state().attendance.length).to.equal(1);
    }, 2000);
  });
});
