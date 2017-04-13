import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import tableHelpers from '../src/public/components/helpers/tableHelpers';

describe('<tableHelpers />', function() {

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

  it('should parse date and time to return Date object', () => {
    var dateAndTime = tableHelpers.parseDateAndTime('1999-12-31T23:59:59.999Z');
    expect(dateAndTime.getFullYear()).to.equal(1999);
    expect(dateAndTime.getMonth()).to.equal(11);
    expect(dateAndTime.getDate()).to.equal(31);
    expect(dateAndTime.getDay()).to.equal(5);
    expect(dateAndTime.getHours()).to.equal(16);
    expect(dateAndTime.getMinutes()).to.equal(59);
    expect(dateAndTime.getSeconds()).to.equal(59);
    expect(dateAndTime.getMilliseconds()).to.equal(999);
  });
  
  it('should convert month from number to string', () => {
    var month = tableHelpers.months[0];
    expect(month).to.equal('January');
    var month = tableHelpers.months[1];
    expect(month).to.equal('February');
    var month = tableHelpers.months[2];
    expect(month).to.equal('March');
    var month = tableHelpers.months[3];
    expect(month).to.equal('April');
    var month = tableHelpers.months[4];
    expect(month).to.equal('May');
    var month = tableHelpers.months[5];
    expect(month).to.equal('June');
    var month = tableHelpers.months[6];
    expect(month).to.equal('July');
    var month = tableHelpers.months[7];
    expect(month).to.equal('August');
    var month = tableHelpers.months[8];
    expect(month).to.equal('September');
    var month = tableHelpers.months[9];
    expect(month).to.equal('October');
    var month = tableHelpers.months[10];
    expect(month).to.equal('November');
    var month = tableHelpers.months[11];
    expect(month).to.equal('December');
  });
  
  it('should convert day from number to string', () => {
    var day = tableHelpers.days[0];
    expect(day).to.equal('Sunday');
    var day = tableHelpers.days[1];
    expect(day).to.equal('Monday');
    var day = tableHelpers.days[2];
    expect(day).to.equal('Tuesday');
    var day = tableHelpers.days[3];
    expect(day).to.equal('Wednesday');
    var day = tableHelpers.days[4];
    expect(day).to.equal('Thursday');
    var day = tableHelpers.days[5];
    expect(day).to.equal('Friday');
    var day = tableHelpers.days[6];
    expect(day).to.equal('Saturday');
  });
  
  it('should format date to string', () => {
    var date = tableHelpers.dateFormatter(new Date(2017, 3, 12));
    expect(date).to.equal('Wednesday, April 12, 2017');
  });
  
  it('should format time to string', () => {
    var time = tableHelpers.timeFormatter(new Date(2017, 3, 12, 16, 33, 21));
    expect(time).to.equal('4:33:21 PM');
  });
  
  it('should sort full names by last name', () => {
    var names = tableHelpers.nameSort(
      {
        first_name: 'Andrew',
        last_name: 'Bobby'
      },
      {
        first_name: 'Andrew',
        last_name: 'Alonis'
      },
      'desc'
    );
    expect(names).to.equal(-1);
  });
  
  it('should sort full names by first name', () => {
    var names = tableHelpers.nameSort(
      {
        first_name: 'Bobby',
        last_name: 'Alonis'
      },
      {
        first_name: 'Andrew',
        last_name: 'Alonis'
      },
      'desc'
    );
    expect(names).to.equal(-1);
  });
});