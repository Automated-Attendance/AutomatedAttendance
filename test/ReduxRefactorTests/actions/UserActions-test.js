import { getLoginStatus, getAllUsers } from '../../../src/public/actions/UserActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../src/public/actions/types';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('user actions', () => {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLoginStatus', () => {

    it('should dispatch notLoggedIn state when no user logged in', async () => {
      const resolved = new Promise(res => res({ data: 'not logged in' }));
      sandbox.stub(axios, 'get').returns(resolved);
      const store = mockStore({});
      const expectedActions = [{
        type: types.GET_LOGIN_STATUS,
        payload: {
          isLoggedIn: false,
          isAdmin: false,
          userEmail: null
        }
      }];
      await store.dispatch(getLoginStatus())
      expect(store.getActions()).to.eql(expectedActions);
      console.log(expect(store.getActions()).to.eql(expectedActions));
    });

    it('should update login status for logged in user', async () => {
      const resolved = new Promise(res => res({ data: [{ type: 'admin', email: 'test@test.com' }] }));
      sandbox.stub(axios, 'get').returns(resolved);
      const store = mockStore({});
      const expectedActions = [{
        type: types.GET_LOGIN_STATUS,
        payload: {
          isLoggedIn: true,
          isAdmin: true,
          userEmail: 'test@test.com'
        }
      }];
      await store.dispatch(getLoginStatus())
      expect(store.getActions()).to.eql(expectedActions);
      console.log(expect(store.getActions()).to.eql(expectedActions));
    });

    it('should throw an error when handling a bad request', async () => {
      const store = mockStore({});
      await store.dispatch(getLoginStatus());
      expect(store.getActions()[0].type).to.eql(types.ERROR_GETTING_USER);
    })
  });

  describe('getAllUsers', () => {

    it('return a user list of users', async () => {
      const payload = [{ first_name: 'Andy', last_name: 'Zou', user_name: 'azou' }];
      const resolved = new Promise(res => res({ data: payload }));
      sandbox.stub(axios, 'get').returns(resolved);
      const store = mockStore({});
      await store.dispatch(getAllUsers());
      expect(store.getActions()[0].type).to.equal(types.GET_ALL_USERS);
    });

    it('should throw error on bad request', async () => {
      const store = mockStore({});
      await store.dispatch(getAllUsers());
      expect(store.getActions()[0].type).to.eql(types.ERROR_GETTING_USER);
    })

  });
});
