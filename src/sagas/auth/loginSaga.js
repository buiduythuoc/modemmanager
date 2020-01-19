import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import LoginActions from '../../stores/auth/loginRedux';
import api from '../../services/api';
import StorageHelper from '../../helpers/StorageHelper';
import NavigationService from '../../services/navigationService';

export function* login(action) {
  const {username, password} = action;
  // make the call to the api
  const response = yield call(api.create().login, username, password);
  console.log(response);

  // TODO:
  if (response.status === 200 && response.data.status === 1) {
    const token = response.data ? response.data.token : '';
    const role = response.data ? response.data.type : 'user';
    yield put(LoginActions.loginSuccess(role));
    StorageHelper.setToken(token);
    StorageHelper.setRole(role);
    NavigationService.navigate('TabBar');
  } else {
    Alert.alert('Error', 'The username or password is incorrect error');
    yield put(LoginActions.loginFailure());
  }
}
