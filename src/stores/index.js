import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as AuthReducer, AuthTypes} from './authRedux';
import {reducer as ModemReducer} from './modemRedux';
import {reducer as TimelineReducer} from './timelineRedux';
import {reducer as MyPageReducer} from './myPageRedux';
import {reducer as AccountReducer} from './accountRedux';
import {reducer as IPReducer} from './ipRedux';

export default () => {
  const allReducers = combineReducers({
    auth: AuthReducer,
    modem: ModemReducer,
    timeline: TimelineReducer,
    myPage: MyPageReducer,
    account: AccountReducer,
    ip: IPReducer,
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
