import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  timelineFetch: ['params', 'onSuccess', 'onError'],
  timelineSet: ['data'],
  timelineAdd: ['params', 'onSuccess', 'onError'],
});

export const TimelineTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
});

/* ------------- Selectors ------------- */

export const TimelineSelectors = {};

/* ------------- Reducers ------------- */

export const setTimeline = (state, action) => {
  const {data} = action;
  console.log(action);
  return {...state, list: data};
};

export const fetchTimeline = (state, action) => {
  return state;
};

export const addTimeline = (state, action) => {
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TIMELINE_SET]: setTimeline,
  [Types.TIMELINE_FETCH]: fetchTimeline,
  [Types.TIMELINE_ADD]: addTimeline,
});
