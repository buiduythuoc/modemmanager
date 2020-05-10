import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import AccountActions from '../stores/accountRedux';
import api from '../services/api';

export function* fetchAccounts(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getListAccounts, userId);

  if (response.status === 200 && response.data.status === 1) {
    const accounts = response.data.data ? response.data.data : [];
    yield put(AccountActions.accountSet(accounts));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}

export function* fetchProfile(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getProfile, userId);

  if (response.status === 200 && response.data.status === 1) {
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

export function* updateProfile(action) {
  const {params, onSuccess, onError} = action;
  const {userId, username, status, expireDate} = params;
  // make the call to the api
  const response = yield call(
    api.create().updateProfile,
    userId,
    username,
    status,
    expireDate,
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

export function* deleteAccount(action) {
  const {params, onSuccess, onError} = action;
  const {userId, deleteId} = params;
  // make the call to the api
  const response = yield call(api.create().deleteAccount, userId, deleteId);

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

export function* fetchNotificationSetting(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getNotificationSetting, userId);

  if (response.status === 200 && response.data.status === 1) {
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

export function* updateNotificationSetting(action) {
  const {params, onSuccess, onError} = action;
  const {
    userId,
    isNotiDevice,
    noOfDevice,
    notiDeviceTitle,
    notiDeviceContent,
    isNotiData,
    noOfData,
    notiDataTitle,
    notiDataContent,
  } = params;
  // make the call to the api
  const response = yield call(
    api.create().updateNotificationSetting,
    userId,
    isNotiDevice,
    noOfDevice,
    notiDeviceTitle,
    notiDeviceContent,
    isNotiData,
    noOfData,
    notiDataTitle,
    notiDataContent,
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

export function* pushNotification(action) {
  const {params, onSuccess, onError} = action;
  const {userId, title, content, type} = params;
  // make the call to the api
  const response = yield call(
    api.create().pushNotification,
    userId,
    title,
    content,
    type,
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
