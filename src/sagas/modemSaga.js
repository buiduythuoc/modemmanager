import {put, call} from 'redux-saga/effects';
import ModemActions from '../stores/modemRedux';
import api from '../services/api';

export function* addModem(action) {
  const {params, onSuccess, onError} = action;
  const {
    domainName,
    port,
    loginName,
    loginPassword,
    userId,
    modemName,
  } = params;
  // make the call to the api
  const response = yield call(
    api.create().addModem,
    domainName,
    port,
    loginName,
    loginPassword,
    userId,
    modemName,
  );
  console.log(action, response);

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

export function* editModem(action) {
  const {params, onSuccess, onError} = action;
  const {
    modemId,
    domainName,
    port,
    loginName,
    loginPassword,
    userId,
    modemName,
  } = params;
  // make the call to the api
  const response = yield call(
    api.create().editModem,
    modemId,
    domainName,
    port,
    loginName,
    loginPassword,
    userId,
    modemName,
  );
  console.log(action, response);

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

export function* fetchModems(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getListModems, userId);
  console.log(action, response);

  if (response.status === 200 && response.data.status === 1) {
    if (onSuccess) {
      const listModems = response.data.data ? response.data.data : [];
      yield put(ModemActions.modemSet(listModems));
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}
