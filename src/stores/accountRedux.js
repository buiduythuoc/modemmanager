import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  accountSet: ['data'],
  accountFetch: ['params', 'onSuccess', 'onError'],
  accountFetchProfile: ['params', 'onSuccess', 'onError'],
  accountUpdateProfile: ['params', 'onSuccess', 'onError'],
  accountSetProfile: ['userId', 'profile'],
  accountDelete: ['params', 'onSuccess', 'onError'],
});

export const AccountTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
});

/* ------------- Selectors ------------- */

export const AccountSelectors = {};

/* ------------- Reducers ------------- */

export const setAccount = (state, action) => {
  const {data} = action;
  return {...state, list: data};
};

export const fetchAccounts = (state, action) => {
  return state;
};

export const deleteAccount = (state, action) => {
  return state;
};

export const fetchProfile = (state, action) => {
  return state;
};

export const updateProfile = (state, action) => {
  return state;
};

export const setProfile = (state, action) => {
  const {userId, userPass} = action;
  const accounts = state.list.map(item => {
    if (item.id === userId) {
      item.user_pass = userPass;
    }
    return item;
  });
  return {...state, list: accounts};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_FETCH]: fetchAccounts,
  [Types.ACCOUNT_SET]: setAccount,
  [Types.ACCOUNT_DELETE]: deleteAccount,
  [Types.ACCOUNT_FETCH_PROFILE]: fetchProfile,
  [Types.ACCOUNT_UPDATE_PROFILE]: updateProfile,
  [Types.ACCOUNT_SET_PROFILE]: setProfile,
});
