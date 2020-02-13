import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as AuthReducer} from './authRedux';
import {reducer as ModemReducer} from './modemRedux';
import {reducer as TimelineReducer} from './timelineRedux';

export default () => {
  const rootReducer = combineReducers({
    auth: AuthReducer,
    modem: ModemReducer,
    timeline: TimelineReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
