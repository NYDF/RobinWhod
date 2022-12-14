import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import watchlistReducer from './watchlistReducer'
import assetReducer from './assetReducer';
import stockReducer from './stockReducer';
import transactionReducer from './transactionReducer';

const appReducer = combineReducers({
  session,
  watchlistReducer,
  assetReducer,
  stockReducer,
  transactionReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'session/REMOVE_USER') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}




let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
