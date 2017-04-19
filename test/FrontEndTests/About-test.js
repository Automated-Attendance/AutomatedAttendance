import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import About from '../../src/public/components/About';


describe('<About />', function() {

  it('should render a title', () => {
    const wrapper = shallow(<About/>);
    expect(wrapper.contains(<h3 className="header">What are we doing here?</h3>)).to.equal(true);
  });

});