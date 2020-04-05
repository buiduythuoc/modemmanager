import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  ipAdd: ['ip'],
});

export const IPTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
});

/* ------------- Selectors ------------- */

export const IPSelectors = {};

/* ------------- Reducers ------------- */

export const addIp = (state, action) => {
  const {ip} = action;
  const index = state.list.findIndex(ipAddress => ipAddress === ip);
  if (index < 0 || state.list.length === 0) {
    return {...state, list: state.list.concat([ip])};
  }
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.IP_ADD]: addIp,
});
