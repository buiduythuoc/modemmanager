import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(rootReducer, rootSaga, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
