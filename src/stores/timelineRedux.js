import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  timelineFetch: ['params', 'onSuccess', 'onError'],
  timelineFetchByModemId: ['params', 'onSuccess', 'onError'],
  timelineSet: ['data'],
  timelineAdd: ['params', 'onSuccess', 'onError'],
  timelineEdit: ['params', 'onSuccess', 'onError'],
  timelineDelete: ['params', 'onSuccess', 'onError'],
  timelineDetail: ['params', 'onSuccess', 'onError'],
  timelinePostComment: ['params', 'onSuccess', 'onError'],
  timelineFetchComments: ['params', 'onSuccess', 'onError'],
  timelineSetComments: ['postId', 'comments'],
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
  return {...state, list: data};
};

export const fetchTimeline = (state, action) => {
  return state;
};

export const fetchTimelineByModemId = (state, action) => {
  return state;
};

export const addTimeline = (state, action) => {
  return state;
};

export const editTimeline = (state, action) => {
  return state;
};

export const deleteTimeline = (state, action) => {
  return state;
};

export const fetchTimelineDetail = (state, action) => {
  return state;
};

export const fetchComments = (state, action) => {
  return state;
};

export const postComment = (state, action) => {
  return state;
};

export const setComments = (state, action) => {
  const {postId, comments} = action;
  const listTimelines = state.list.map(item => {
    if (item.id === postId) {
      item.comments = comments;
    }
    return item;
  });
  return {...state, list: listTimelines};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TIMELINE_SET]: setTimeline,
  [Types.TIMELINE_FETCH]: fetchTimeline,
  [Types.TIMELINE_FETCH_BY_MODEM_ID]: fetchTimelineByModemId,
  [Types.TIMELINE_ADD]: addTimeline,
  [Types.TIMELINE_EDIT]: editTimeline,
  [Types.TIMELINE_DELETE]: deleteTimeline,
  [Types.TIMELINE_DETAIL]: fetchTimelineDetail,
  [Types.TIMELINE_POST_COMMENT]: postComment,
  [Types.TIMELINE_FETCH_COMMENTS]: fetchComments,
  [Types.TIMELINE_SET_COMMENTS]: setComments,
});
