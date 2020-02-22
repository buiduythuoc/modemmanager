import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as AuthReducer, AuthTypes} from './authRedux';
import {reducer as ModemReducer} from './modemRedux';
import {reducer as TimelineReducer} from './timelineRedux';
import {reducer as MyPageReducer} from './myPageRedux';
import {reducer as AccountReducer} from './accountRedux';

export default () => {
  const allReducers = combineReducers({
    auth: AuthReducer,
    modem: ModemReducer,
    timeline: TimelineReducer,
    myPage: MyPageReducer,
    account: AccountReducer,
  });

  const rootReducer = (state, action) => {
    let mState = state;
    if (action.type === AuthTypes.AUTH_LOGOUT) {
      mState = undefined;
    }
    return allReducers(mState, action);
  };

  return configureStore(rootReducer, rootSaga);
};
