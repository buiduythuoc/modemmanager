import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import SignupActions from '../../stores/auth/signupRedux';
import api from '../../services/api';
import StorageHelper from '../../helpers/StorageHelper';
import NavigationService from '../../services/navigationService';

export function* signup(action) {
  const {username, password, role} = action;
  // make the call to the api
  const response = yield call(api.create().signup, username, password, role);
  console.log(response);

  //TODO:
  if (response.status === 200 && response.data.status === 1) {
    const token = response.data ? response.data.token : '';
    const type = response.data ? response.data.type : 'user';
    yield put(SignupActions.signupSuccess(role));
    StorageHelper.setToken(token);
    StorageHelper.setRole(type);
    NavigationService.navigate('TabBar');
  } else {
    Alert.alert('Error', 'Can not create a new account');
    yield put(SignupActions.signupFailure());
  }
}
