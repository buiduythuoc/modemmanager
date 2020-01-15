import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as AuthReducer} from './authRedux';

export default () => {
  const rootReducer = combineReducers({
    auth: AuthReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
