/* eslint function-paren-newline: 0 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../reducers/rootReducer';

const history = createBrowserHistory();
// const persistConfig = {
//   key: 'root',
//   storage,
//   whiteList: ['cart'],
//   stateReconciler: autoMergeLevel2
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [routerMiddleware(history), thunk];
// const reduxLogger = createLogger();

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(reduxLogger);
// }


const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

export default store;
// export const persistor = persistStore(store);
