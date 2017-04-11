import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import App from '../src/public/components/index';

describe('<App />', function() {
  
  it('calls componentWillMount', () => {
    const componentWillMountSpy = spy(App.prototype, 'componentWillMount');
    const wrapper = shallow(<App />);
    expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
    componentWillMountSpy.restore();
  });

  it('contains a Navigation bar', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.find('Navigation')).to.have.length(1);
  });

  it('contains a Routes child component', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.find('Routes')).to.have.length(1);
  });

  it('should receive a response from server after login', () => {

  });

});

