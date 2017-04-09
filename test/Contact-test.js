import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Contact from '../src/public/components/Contact';


describe('<Contact />', function() {

  it('should contain a link to email support', () => {
    const wrapper = shallow(<Contact/>);
    expect(wrapper.contains(<a href="mailto:AAAllstars@gmail.com?Subject=Automated%20Attendance%20Support">AAAllstars@gmail.com</a>)).to.equal(true);
  });

  it('should contain a header asking about questions or comments', () => {
    const wrapper = shallow(<Contact/>);
    expect(wrapper.contains(<h3 className="header">
        Questions or comments?
      </h3>)).to.equal(true);
  });

});