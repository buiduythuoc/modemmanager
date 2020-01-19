import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['role'],
  loginFailure: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  role: 'user',
});

/* ------------- Selectors ------------- */

export const LoginSelectors = {};

/* ------------- Reducers ------------- */

// request the auth
export const loginRequest = (state, action) => {
  return state.merge({fetching: true});
};

// successful to login
export const loginSuccess = (state, action) => {
  const {role} = action;
  console.log('Action', action);
  return state.merge({fetching: false, error: false, role});
};

// failed to login
export const loginFailure = state => {
  console.log('loginFailure');
  return state.merge({fetching: false, error: true});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
});
