import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
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
    provider,
    modemProvider,
  } = params;
  // make the call to the api
  const publicIpResponse = yield call(api.create().getPublicIp);
  const response = yield call(
    api.create().addModem,
    domainName,
    port,
    loginName,
    loginPassword,
    userId,
    modemName,
    provider,
    modemProvider,
    publicIpResponse.data,
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
    const devices = response.data.data ? response.data.data : [];
    yield put(ModemActions.deviceSet(modemId, devices));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}

export function* fetchProviders(action) {
  const {params, onSuccess, onError} = action;
  const {userId} = params;
  // make the call to the api
  const response = yield call(api.create().getListProviders, userId);

  if (response.status === 200 && response.data.status === 1) {
    const listProviders = response.data.data ? response.data.data : [];
    yield put(ModemActions.providerSet(listProviders));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}

export function* blockDevice(action) {
  const {params, onSuccess, onError} = action;
  const {userId, modemId, deviceMac, deviceName} = params;
  // make the call to the api
  const response = yield call(
    api.create().blockDevice,
    userId,
    modemId,
    deviceMac,
    deviceName,
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

export function* fetchBlockDevices(action) {
  const {params, onSuccess, onError} = action;
  const {userId, modemId} = params;
  // make the call to the api
  const response = yield call(api.create().getBlockList, userId, modemId);

  if (response.status === 200 && response.data.status === 1) {
    const blockDevices = response.data.data ? response.data.data : [];
    yield put(ModemActions.deviceBlockSet(modemId, blockDevices));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    if (onError) {
      onError();
    }
  }
}
