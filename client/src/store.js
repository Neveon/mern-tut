// Entry point to redux store
// Only way to change state inside is to dispatch an action
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// createStore(Reducer, state, middleware)
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    // Below taken from redux devTools on chrome, links to https://github.com/zalmoxisus/redux-devtools-extension#usage
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;