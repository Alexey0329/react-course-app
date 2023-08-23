import { ADD_NEW_COURSE, DELETE_COURSE, GET_COURSES } from './types';

export const addNewCourseAction = (payload) => ({
	type: ADD_NEW_COURSE,
	payload,
});
export const deleteCourseAction = (payload) => ({
	type: DELETE_COURSE,
	payload,
});
export const getCoursesAction = (payload) => ({ type: GET_COURSES, payload });
