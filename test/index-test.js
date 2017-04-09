import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import App from '../src/public/index';

describe('<App />', function() {
  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentWillMount');
    const wrapper = shallow(<App />);
    expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  // it("contains spec with an expectation", function() {
  //   expect(shallow(<Foo />).is('.foo')).toBe(true);
  // });

  // it("contains spec with an expectation", function() {
  //   expect(mount(<Foo />).find('.foo').length).toBe(1);
  // });

  // it("can run an expectation with render", function() {
  //   expect(render(<Foo />).find('.foo').length).toBe(1);
  // });
});

