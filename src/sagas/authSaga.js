import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import AuthActions from '../stores/authRedux';
import api from '../services/api';
import StorageHelper from '../helpers/StorageHelper';
import NavigationService from '../services/navigationService';

export function* login(action) {
  const {params, onSuccess, onError} = action;
  const {username, password} = params;
  // make the call to the api
  const response = yield call(api.create().login, username, password);
  console.log(response);

  if (response.status === 200 && response.data.status === 1) {
    yield put(AuthActions.authSet(response.data));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    Alert.alert('Error', 'The username or password is incorrect error');
    if (onError) {
      onError();
    }
  }
}

export function* signup(action) {
  const {params, onSuccess, onError} = action;
  const {username, password, role} = params;
  // make the call to the api
  const response = yield call(api.create().signup, username, password, role);
  console.log(response);

  if (response.status === 200 && response.data.status === 1) {
    yield put(AuthActions.authSet(response.data));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    Alert.alert('Error', 'Can not create a new account');
    if (onError) {
      onError();
    }
  }
}
