import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import AuthActions from '../stores/authRedux';
import api from '../services/api';

export function* fetchMyProfile(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getProfile, userId);

  if (response.status === 200 && response.data.status === 1) {
    yield put(AuthActions.authSet(response.data.data));
    if (onSuccess) {
      onSuccess(response.data.data);
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

export function* updateMyProfile(action) {
  const {params, onSuccess, onError} = action;
  const {userId, username, status, expireDate, avatar} = params;
  // make the call to the api
  const response = yield call(
    api.create().updateProfile,
    userId,
    username,
    status,
    expireDate,
    avatar,
  );

  if (response.status === 200 && response.data.status === 1) {
    // yield put(AuthActions.authSet(response.data.data));
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

export function* changePassword(action) {
  const {params, onSuccess, onError} = action;
  const {userId, currentPassword, newPassword} = params;
  // make the call to the api
  const response = yield call(
    api.create().changePassword,
    userId,
    currentPassword,
    newPassword,
  );

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
