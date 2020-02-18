import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  myPageFetch: ['params', 'onSuccess', 'onError'],
  myPageUpdate: ['params', 'onSuccess', 'onError'],
  myPageChangePassword: ['params', 'onSuccess', 'onError'],
});

export const MyPageTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({});

/* ------------- Selectors ------------- */

export const MyPageSelectors = {};

/* ------------- Reducers ------------- */

export const fetchProfile = (state, action) => {
  return state;
};

export const updateProfile = (state, action) => {
  return state;
};

export const changePassword = (state, action) => {
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_PAGE_FETCH]: fetchProfile,
  [Types.MY_PAGE_UPDATE]: updateProfile,
  [Types.MY_PAGE_CHANGE_PASSWORD]: changePassword,
});
