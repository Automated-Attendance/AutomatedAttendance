import React from 'react';
import { shallow, mount, render } from 'enzyme';
import index from '../src/public/index.jsx';

describe('A suite', function() {
  it('contains spec with an expectation', function() {
    expect(shallow(<index />).contains(<div className="container" />)).toBe(true);
  });
});