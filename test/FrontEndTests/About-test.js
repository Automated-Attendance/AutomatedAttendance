import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import About from '../../src/public/components/About';


describe('<About />', function() {

  it('should render a title', () => {
    const wrapper = shallow(<About/>);
    expect(wrapper.contains(
      <h3 className="header">
      This is an automated attendance application for <a href="https://www.hackreactor.com/">Hack Reactor</a> students and staff
      </h3>
    )).to.equal(true);
  });

});