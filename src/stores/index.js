import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as LoginReducer} from './auth/loginRedux';
import {reducer as SignupReducer} from './auth/signupRedux';

export default () => {
  const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
  });
  return configureStore(rootReducer, rootSaga);
};
