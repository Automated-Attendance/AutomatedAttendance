// import React from 'react';
// import { shallow } from 'enzyme';
// import { expect } from 'chai';
// import Routes from '../../src/public/components/Routes';


// describe('<Routes />', function() {

//   const admin = {
//     isLoggedIn: true,
//     isAdmin: true
//   };

//   const student = {
//     isLoggedIn: true,
//     isAdmin: false
//   };

//   const notLoggedIn = {
//     isLoggedIn: false,
//     isAdmin: false
//   };

//   it('should receive props', () => {
//     const wrapper = shallow(<Routes userPrivs={admin}/>);
//     expect(wrapper.instance().props.userPrivs.isLoggedIn).to.equal(true);
//     expect(wrapper.instance().props.userPrivs.isAdmin).to.equal(true);
//   });

// });