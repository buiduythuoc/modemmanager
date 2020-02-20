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

  if (response.status === 200 && response.data.status === 1) {
    const listModems = response.data.data ? response.data.data : [];
    yield put(ModemActions.modemSet(listModems));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}

export function* fetchDevices(action) {
  const {params, onSuccess, onError} = action;
  const {userId, modemId, domain, port, username, password} = params;
  // make the call to the api
  const response = yield call(
    api.create().getListDevices,
    userId,
    modemId,
    domain,
    port,
    username,
    password,
  );

  if (response.status === 200 && response.data.status === 1) {
    const listDevices = response.data.data ? response.data.data : [];
    yield put(ModemActions.deviceSet(listDevices));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}
