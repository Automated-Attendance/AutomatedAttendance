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
      const result = await store.dispatch(getLoginStatus())
      expect(store.getActions()).to.eql(expectedActions);
      console.log(expect(store.getActions()).to.eql(expectedActions));
    });

    it('should', () => {

    });
  });
});
