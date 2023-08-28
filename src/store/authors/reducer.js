import { GET_AUTHORS, ADD_NEW_AUTHOR } from './types';

export const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case ADD_NEW_AUTHOR:
			return [...state, action.payload];
		case GET_AUTHORS:
			return [...action.payload];
		default:
			return state;
	}
};
