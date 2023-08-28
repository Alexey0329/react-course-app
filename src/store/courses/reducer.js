import { ADD_NEW_COURSE, DELETE_COURSE, GET_COURSES } from './types';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case ADD_NEW_COURSE:
			return [...state, action.payload];
		case DELETE_COURSE:
			return [
				...state.filter((course) => {
					return course.id !== action.payload;
				}),
			];
		case GET_COURSES:
			return [...action.payload];
		default:
			return state;
	}
};
