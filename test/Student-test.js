import React from 'react';
import mysql from 'mysql';
import { shallow, mount, render } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import Student from '../src/public/components/Student';

describe('<Student />', function() {

  it('calls componentDidMount', () => {
    const componentDidMountSpy = spy(Student.prototype, 'componentDidMount');
    const wrapper = shallow(<Student />);
    expect(Student.prototype.componentDidMount.calledOnce).to.equal(false);
  });


  // beforeEach(function(done) {
  //   dbConnection = mysql.createConnection({
  //     user: 'root',
  //     password: 'cake',
  //     database: 'AutomatedAttendance'
  //   });
  //   dbConnection.connect();


  //   var tablenames = ['attendance_record', 'class_user', 'classes', 'users'];
    
  //    Empty the db table before each test so that multiple tests
  //    * (or repeated runs of the tests) won't screw each other up: 

  //   tablename.forEach( (table)=>{
  //     dbConnection.query('truncate ' + tablename, done)
  //   });

  // });

  // afterEach(function() {
  //   dbConnection.end();
  // });

});

