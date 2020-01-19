import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  signupRequest: ['username', 'password', 'role'],
  signupSuccess: null,
  signupFailure: null,
});

export const SignupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
});

/* ------------- Selectors ------------- */

export const SignupSelectors = {};

/* ------------- Reducers ------------- */

// request the signup
export const signupRequest = (state, action) => {
  return state.merge({fetching: true});
};

// successful to signup
export const signupSuccess = (state, action) => {
  return state.merge({fetching: false, error: false});
};

// failed to signup
export const signupFailure = state => {
  return state.merge({fetching: false, error: true});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
});
