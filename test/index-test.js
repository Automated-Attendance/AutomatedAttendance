import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import App from '../src/public/index';

describe('<App />', function() {
  
  it('calls componentWillMount', () => {
    const componentDidMountSpy = spy(App.prototype, 'componentWillMount');
    const wrapper = shallow(<App />);
    expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
    componentDidMountSpy.restore();
  });

  it('contains a Navigation bar', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.find('Navigation')).to.have.length(1);
  });

  it('contains a Routes child component', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.find('Routes')).to.have.length(1);
  });

});

