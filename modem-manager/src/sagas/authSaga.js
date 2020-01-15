import {put, call} from 'redux-saga/effects';
import AuthActions from '../stores/authRedux';

export function* login(api, action) {
  const {username, password} = action;
  // make the call to the api
  const response = yield call(null, username, password);

  if (response.ok) {
    yield put(AuthActions.loginSuccess());
  } else {
    yield put(AuthActions.loginFailure());
  }
}
