import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  modemFetch: ['params', 'onSuccess', 'onError'],
  modemSet: ['data'],
  modemAdd: ['params', 'onSuccess', 'onError'],
});

export const ModemTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
});

/* ------------- Selectors ------------- */

export const ModemSelectors = {};

/* ------------- Reducers ------------- */

export const setModem = (state, action) => {
  const {data} = action;
  return state.merge({list: data});
};

export const fetchModem = (state, action) => {
  return state;
};

export const addModem = (state, action) => {
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MODEM_SET]: setModem,
  [Types.MODEM_FETCH]: fetchModem,
  [Types.MODEM_ADD]: addModem,
});
