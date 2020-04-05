import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  authSet: ['data'],
  authSetUser: ['data'],
  authLogin: ['params', 'onSuccess', 'onError'],
  authLogout: [],
  authRegister: ['params', 'onSuccess', 'onError'],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: {
    user_id: 0,
    type: 'user',
  },
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {};

/* ------------- Reducers ------------- */

export const login = (state, action) => {
  return state;
};

export const register = (state, action) => {
  return state;
};

export const setAuth = (state, action) => {
  const {data} = action;
  return {...state, user: data};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_LOGIN]: login,
  [Types.AUTH_REGISTER]: register,
  [Types.AUTH_SET]: setAuth,
  [Types.AUTH_SET_USER]: setAuth,
});
