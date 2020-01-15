import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: null,
  loginFailure: null,
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {};

/* ------------- Reducers ------------- */

// request the auth
export const loginRequest = (state, action) => {
  state.merge({fetching: true});
};

// successful to login
export const loginSuccess = (state, action) => {
  return state.merge({fetching: false, error: null});
};

// failed to login
export const loginFailure = state => {
  state.merge({fetching: false, error: true});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
});
