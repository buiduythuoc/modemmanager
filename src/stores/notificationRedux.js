import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  notificationSetIsNew: ['isNew'],
});

export const NotificationsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isNew: false,
});

/* ------------- Selectors ------------- */

export const NotificationsSelectors = {};

/* ------------- Reducers ------------- */

export const setIsNew = (state, action) => {
  const {isNew} = action;
  return {...state, isNew};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_SET_IS_NEW]: setIsNew,
});
