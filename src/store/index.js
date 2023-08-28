import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './rootReducer.js';
import { coursesInitialState } from '../store/courses/reducer.js';
import { authorsInitialState } from '../store/authors/reducer.js';
import { userInitialState } from '../store/user/reducer.js';

const appInitialState = {
	courses: coursesInitialState,
	authors: authorsInitialState,
	user: userInitialState,
};

export const store = configureStore(
	{ reducer: rootReducer },
	appInitialState,
	composeWithDevTools
);

export default store;
