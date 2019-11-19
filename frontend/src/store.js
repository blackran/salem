import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];
const initState = {};
let store;
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

if(window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools){
	store = createStore(
		rootReducer,
		initState,
		compose(
			applyMiddleware(...middleware),
			ReactReduxDevTools
		)
	);
}else{
	store = createStore(
		rootReducer,
		initState,
		compose(
			applyMiddleware(...middleware)
		)
	);
}

export default store;
