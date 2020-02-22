import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  modemFetch: ['params', 'onSuccess', 'onError'],
  modemSet: ['data'],
  modemAdd: ['params', 'onSuccess', 'onError'],
  modemEdit: ['params', 'onSuccess', 'onError'],
  deviceFetch: ['params', 'onSuccess', 'onError'],
  deviceSet: ['modemId', 'devices'],
  providerFetch: ['params', 'onSuccess', 'onError'],
  providerSet: ['data'],
  deviceBlock: ['params', 'onSuccess', 'onError'],
  deviceBlockListFetch: ['params', 'onSuccess', 'onError'],
  deviceBlockSet: ['modemId', 'blockDevices'],
});

export const ModemTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
  providerList: [],
});

/* ------------- Selectors ------------- */

export const ModemSelectors = {};

/* ------------- Reducers ------------- */

export const setModem = (state, action) => {
  const {data} = action;
  return {...state, list: data};
};

export const fetchModem = (state, action) => {
  return state;
};

export const addModem = (state, action) => {
  return state;
};

export const editModem = (state, action) => {
  return state;
};

export const fetchDevices = (state, action) => {
  return state;
};

export const setDeviceList = (state, action) => {
  const {modemId, devices} = action;
  const list = state.list.map(item => {
    if (item.id === modemId) {
      item.devices = devices;
    }
    return item;
  });
  return {...state, list};
};

export const fetchProviders = (state, action) => {
  return state;
};

export const setProviderList = (state, action) => {
  const {data} = action;
  return {...state, providerList: data};
};

export const blockDevice = (state, action) => {
  return state;
};

export const fetchBlockDevices = (state, action) => {
  return state;
};

export const setBlockDeviceList = (state, action) => {
  const {modemId, blockDevices} = action;
  const list = state.list.map(item => {
    if (item.id === modemId) {
      item.blockDevices = blockDevices;
    }
    return item;
  });
  return {...state, list};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MODEM_SET]: setModem,
  [Types.MODEM_FETCH]: fetchModem,
  [Types.MODEM_ADD]: addModem,
  [Types.MODEM_EDIT]: editModem,
  [Types.DEVICE_FETCH]: fetchDevices,
  [Types.DEVICE_SET]: setDeviceList,
  [Types.PROVIDER_FETCH]: fetchProviders,
  [Types.PROVIDER_SET]: setProviderList,
  [Types.DEVICE_BLOCK_LIST_FETCH]: blockDevice,
  [Types.DEVICE_BLOCK_SET]: setBlockDeviceList,
});
