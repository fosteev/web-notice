import AppReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(AppReducer, composeWithDevTools(applyMiddleware(thunk)));
