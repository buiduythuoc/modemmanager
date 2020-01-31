import {put, call} from 'redux-saga/effects';
import TimelineActions from '../stores/timelineRedux';
import api from '../services/api';

export function* addTimeline(action) {
  const {params, onSuccess, onError} = action;
  const {title, subTitle, userId, modemId, content} = params;
  // make the call to the api
  const response = yield call(
    api.create().addTimeline,
    title,
    subTitle,
    userId,
    modemId,
    content,
  );
  console.log(response);

  if (response.status === 200 && response.data.status === 1) {
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}

export function* fetchTimelines(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getListTimelines, userId);
  console.log(action, response, onSuccess);

  if (response.status === 200 && response.data.status === 1) {
    if (onSuccess) {
      const listTimelines = response.data.data ? response.data.data : [];
      yield put(TimelineActions.timelineSet(listTimelines));
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}
