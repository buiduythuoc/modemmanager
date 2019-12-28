import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
import {reducer as AuthReducer} from './authRedux';

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    auth: AuthReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
