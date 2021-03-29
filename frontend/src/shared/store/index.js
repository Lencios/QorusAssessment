import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import getRootReducer from '../redux';

let store = {};
export function configureStore(initialState, scope = 'main') {
    const sagaMiddleware = createSagaMiddleware({
        onError: (error) => {
            throw error;
        }
    });

   /*  let middleware = [];
    
    middleware = [...sagaMiddleware]; */

  /*    if(scope === 'main') {
        middleware = [
            sagaMiddleware,
        ];
    }  */

    const enhanced = [applyMiddleware(sagaMiddleware)];

    const rootReducer = getRootReducer(scope);
    const enhancer = compose(...enhanced);
    store = createStore(rootReducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga);
   /*  if(scope === 'main') {
        sagaMiddleware.run(rootSaga);
    } */

    return store;
}

export const getStore = () => {
    return store;
}