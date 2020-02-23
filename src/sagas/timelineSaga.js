import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
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
  const {userId, role} = params;
  // make the call to the api
  let publicIp = '';
  if (role === 'guest') {
    const publicIpResponse = yield call(api.create().getPublicIp);
    publicIp = publicIpResponse.data;
  }
  const response = yield call(api.create().getListTimelines, userId, publicIp);

  if (response.status === 200 && response.data.status === 1) {
    const listTimelines = response.data.data ? response.data.data : [];
    yield put(TimelineActions.timelineSet(listTimelines));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}

export function* deleteTimeline(action) {
  const {params, onSuccess, onError} = action;
  const {userId, postId} = params;
  // make the call to the api
  const response = yield call(api.create().deleteTimeline, userId, postId);

  if (response.status === 200 && response.data.status === 1) {
    if (onSuccess) {
      onSuccess();
    }
  } else {
    const errorMessage = response.data.message
      ? response.data.message
      : 'Some error';
    Alert.alert('Error', errorMessage);
    if (onError) {
      onError();
    }
  }
}

export function* fetchTimelineDetail(action) {
  const {params, onSuccess, onError} = action;
  const {userId, postId} = params;
  // make the call to the api
  const response = yield call(api.create().getTimelineDetail, userId, postId);

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

export function* editTimeline(action) {
  const {params, onSuccess, onError} = action;
  const {timelineId, title, subTitle, userId, modemId, content} = params;
  // make the call to the api
  const response = yield call(
    api.create().editTimeline,
    timelineId,
    title,
    subTitle,
    userId,
    modemId,
    content,
  );

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

export function* postComment(action) {
  const {params, onSuccess, onError} = action;
  const {postId, comment, userId} = params;
  // make the call to the api
  const response = yield call(
    api.create().postComment,
    userId,
    postId,
    comment,
  );

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

export function* fetchComments(action) {
  const {params, onSuccess, onError} = action;
  const {postId, userId} = params;
  // make the call to the api
  const response = yield call(api.create().fetchComments, userId, postId);

  if (response.status === 200 && response.data.status === 1) {
    const comments = response.data.comments ? response.data.comments : [];
    yield put(TimelineActions.timelineSetComments(postId, comments));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}
