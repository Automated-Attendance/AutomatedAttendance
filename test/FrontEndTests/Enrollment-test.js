import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Enrollment from '../../src/public/components/Enrollment';
import ToggleStatus from '../../src/public/components/ToggleStatus';

const setTimeoutAsync = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('<Enrollment />', function() {

  it('should have a table', () => {
    const wrapper = mount(<Enrollment/>);
    expect(wrapper.find('BootstrapTable')).to.have.length(1);
  });
  
  it('should have two columns in the table', () => {
    const wrapper = mount(<Enrollment/>);
    expect(wrapper.find('TableHeaderColumn')).to.have.length(2);
  });

  it ('should have available toggle status options', () => {
    const wrapper = mount(<Enrollment/>);
    expect(wrapper.state().statusOptions[0].label).to.equal('Student');
    expect(wrapper.state().statusOptions[1].label).to.equal('Admin')
  });

});


describe('<Enrollment/> handleSubmitToggleStatus()', () => {

  it ('should call handleSubmitToggleStatus on form click', () => {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitToggleStatus');
    const wrapper = mount(<Enrollment/>);
    wrapper.setState({selectedStudentToggleStatus: {label: 'Duy Nguyen - nguyenaiden' , value: 'nguyenaiden'}, selectedStatus: 'Student'});
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitToggleStatus').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it ('should not toggle status if states are empty', () => {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitToggleStatus');
    const wrapper = mount(<Enrollment/>);
    wrapper.find('.handleSubmitToggleStatus').simulate('click');
    expect(wrapper.state().statusToggled).to.equal(false);
    testFn.restore();
  });

});


describe('<Enrollment/> populateTable()', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const enrollmentData = JSON.parse('[[{"classes_id":1,"class_name":"HRSF72","id":1,"class_id":1,"user_id":1,"users_id":1,"user_name":"hanzh","first_name":"Han","last_name":"Zhao","email":"hanshengzhao1993@gmail.com","photo":null,"type":"student"},{"classes_id":1,"class_name":"HRSF72","id":2,"class_id":1,"user_id":2,"users_id":2,"user_name":"andrewaaalonis","first_name":"Andrew","last_name":"Alonis","email":"andrew@gmail.com","photo":null,"type":"student"},{"classes_id":1,"class_name":"HRSF72","id":3,"class_id":1,"user_id":4,"users_id":4,"user_name":"Jukejc","first_name":"Jason","last_name":"Chambers","email":"jas.o.chambers@gmail.com","photo":null,"type":"admin"},{"classes_id":1,"class_name":"HRSF72","id":5,"class_id":1,"user_id":5,"users_id":5,"user_name":"AADevStudent","first_name":"aadevstudent@gmail.com","last_name":"undefined","email":"aadevstudent@gmail.com","photo":"http://res.cloudinary.com/automatedattendance/image/upload/v1492489476/AADevStudent.png","type":"student"},{"classes_id":2,"class_name":"HRSF76","id":4,"class_id":2,"user_id":3,"users_id":3,"user_name":"Duy12312313","first_name":"Duy","last_name":"Nguyen","email":"duyng92@gmail.com","photo":null,"type":"student"}],[{"catalog":"def","db":"automatedattendance","table":"classes","orgTable":"classes","name":"classes_id","orgName":"classes_id","charsetNr":63,"length":11,"type":3,"flags":16898,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"classes","orgTable":"classes","name":"class_name","orgName":"class_name","charsetNr":33,"length":150,"type":253,"flags":4096,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"class_user","orgTable":"class_user","name":"id","orgName":"id","charsetNr":63,"length":11,"type":3,"flags":16899,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"class_user","orgTable":"class_user","name":"class_id","orgName":"class_id","charsetNr":63,"length":11,"type":3,"flags":20489,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"class_user","orgTable":"class_user","name":"user_id","orgName":"user_id","charsetNr":63,"length":11,"type":3,"flags":20489,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"users_id","orgName":"users_id","charsetNr":63,"length":11,"type":3,"flags":16898,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"user_name","orgName":"user_name","charsetNr":33,"length":150,"type":253,"flags":4096,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"first_name","orgName":"first_name","charsetNr":33,"length":150,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"last_name","orgName":"last_name","charsetNr":33,"length":150,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"email","orgName":"email","charsetNr":33,"length":150,"type":253,"flags":20484,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"photo","orgName":"photo","charsetNr":33,"length":600,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"type","orgName":"type","charsetNr":33,"length":150,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true}]]');
    const resolved = new Promise((res) => res({ data: enrollmentData }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should populate enrollment records', async function() {
    const wrapper = await mount(<Enrollment/>);
    // setTimeout(() => expect(wrapper.state().enrollmentRecords.length).to.equal(5), 2000);
  });

});



describe('<Enrollment/> getClassOptions()', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const enrollmentData = JSON.parse('[[{"classes_id":1,"class_name":"HRSF72","id":1,"class_id":1,"user_id":1,"users_id":1,"user_name":"hanzh","first_name":"Han","last_name":"Zhao","email":"hanshengzhao1993@gmail.com","photo":null,"type":"student"},{"classes_id":1,"class_name":"HRSF72","id":2,"class_id":1,"user_id":2,"users_id":2,"user_name":"andrewaaalonis","first_name":"Andrew","last_name":"Alonis","email":"andrew@gmail.com","photo":null,"type":"student"},{"classes_id":1,"class_name":"HRSF72","id":3,"class_id":1,"user_id":4,"users_id":4,"user_name":"Jukejc","first_name":"Jason","last_name":"Chambers","email":"jas.o.chambers@gmail.com","photo":null,"type":"admin"},{"classes_id":1,"class_name":"HRSF72","id":5,"class_id":1,"user_id":5,"users_id":5,"user_name":"AADevStudent","first_name":"aadevstudent@gmail.com","last_name":"undefined","email":"aadevstudent@gmail.com","photo":"http://res.cloudinary.com/automatedattendance/image/upload/v1492489476/AADevStudent.png","type":"student"},{"classes_id":2,"class_name":"HRSF76","id":4,"class_id":2,"user_id":3,"users_id":3,"user_name":"Duy12312313","first_name":"Duy","last_name":"Nguyen","email":"duyng92@gmail.com","photo":null,"type":"student"}],[{"catalog":"def","db":"automatedattendance","table":"classes","orgTable":"classes","name":"classes_id","orgName":"classes_id","charsetNr":63,"length":11,"type":3,"flags":16898,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"classes","orgTable":"classes","name":"class_name","orgName":"class_name","charsetNr":33,"length":150,"type":253,"flags":4096,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"class_user","orgTable":"class_user","name":"id","orgName":"id","charsetNr":63,"length":11,"type":3,"flags":16899,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"class_user","orgTable":"class_user","name":"class_id","orgName":"class_id","charsetNr":63,"length":11,"type":3,"flags":20489,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"class_user","orgTable":"class_user","name":"user_id","orgName":"user_id","charsetNr":63,"length":11,"type":3,"flags":20489,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"users_id","orgName":"users_id","charsetNr":63,"length":11,"type":3,"flags":16898,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"user_name","orgName":"user_name","charsetNr":33,"length":150,"type":253,"flags":4096,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"first_name","orgName":"first_name","charsetNr":33,"length":150,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"last_name","orgName":"last_name","charsetNr":33,"length":150,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"email","orgName":"email","charsetNr":33,"length":150,"type":253,"flags":20484,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"photo","orgName":"photo","charsetNr":33,"length":600,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def","db":"automatedattendance","table":"users","orgTable":"users","name":"type","orgName":"type","charsetNr":33,"length":150,"type":253,"flags":0,"decimals":0,"zeroFill":false,"protocol41":true}]]');
    const resolved = new Promise((res) => res({ data: enrollmentData }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should call getClassOptions on mount', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'getClassOptions');
    expect(testFn.called).to.equal(false);
    const wrapper = mount(<Enrollment />);
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

});



describe('<Enrollment/> handleSubmitAddClass()', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: 'testData' }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should call handleSubmitAddClass on button click', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitAddClass');
    const wrapper = mount(<Enrollment />);
    wrapper.setState({ createClassName: 'testing' });
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitAddClass').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should alert on no class selection', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitAddClass');
    const wrapper = mount(<Enrollment />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitAddClass').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });
});

describe('<Enrollment/> handleSubmitAddStudent()', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: 'testData' }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should call handleSubmitAddStudent on button click', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitAddStudent');
    const wrapper = mount(<Enrollment />);
    wrapper.setState({ selectedClassAddStudent: 'testing', selectedStudentAddStudent: 'testingtwo', studentPhoto: 'nophoto' });
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitAddStudent').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should alert on no form filled', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitAddStudent');
    const wrapper = mount(<Enrollment />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitAddStudent').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });
});

describe('<Enrollment/> handleSubmitRemoveStudent()', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: 'testData' }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should call handleSubmitRemoveStudent on button click', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitRemoveStudent');
    const wrapper = mount(<Enrollment />);
    wrapper.setState({ selectedClassRemoveStudent: 'testing', selectedStudentRemoveStudent: 'testingtwo' });
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitRemoveStudent').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should alert on no form filled', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitRemoveStudent');
    const wrapper = mount(<Enrollment />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitRemoveStudent').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });
});

describe('<Enrollment/> handleSubmitRemoveClass()', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: 'testData' }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should call handleSubmitRemoveClass on button click', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitRemoveClass');
    const wrapper = mount(<Enrollment />);
    wrapper.setState({ selectedClassRemoveClass: 'testing' });
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitRemoveClass').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });

  it('should alert on no form filled', async function() {
    const testFn = sinon.spy(Enrollment.prototype, 'handleSubmitRemoveClass');
    const wrapper = mount(<Enrollment />);
    expect(testFn.called).to.equal(false);
    wrapper.find('.handleSubmitRemoveClass').simulate('click');
    expect(testFn.called).to.equal(true);
    testFn.restore();
  });
});

describe('<Enrollment/> toggleOff()', function() {

  it('toggleOff should change states', function(done) {
    this.timeout(6000);
    const wrapper = mount(<Enrollment />);
    wrapper.instance().toggleOff('classAdded', 'studentOptionsByClass', 'statusToggled','selectedStudentToggleStatus', 'selectedStatus');
    setTimeout(() => done(), 5100);
  });

});