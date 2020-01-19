import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {LoginTypes} from '../stores/auth/loginRedux';
import {SignupTypes} from '../stores/auth/signupRedux';

/* ------------- Sagas ------------- */

import {login} from './auth/loginSaga';
import {signup} from './auth/signupSaga';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action

    // some sagas receive extra parameters in addition to an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup),
  ]);
}
