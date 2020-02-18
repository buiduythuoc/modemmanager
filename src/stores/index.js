import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as AuthReducer} from './authRedux';
import {reducer as ModemReducer} from './modemRedux';
import {reducer as TimelineReducer} from './timelineRedux';
import {reducer as MyPageReducer} from './myPageRedux';

export default () => {
  const rootReducer = combineReducers({
    auth: AuthReducer,
    modem: ModemReducer,
    timeline: TimelineReducer,
    myPage: MyPageReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
