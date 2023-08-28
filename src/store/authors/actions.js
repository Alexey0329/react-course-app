import { GET_AUTHORS, ADD_NEW_AUTHOR } from './types';

export const addNewAuthorAction = (payload) => ({
	type: ADD_NEW_AUTHOR,
	payload,
});
export const getAuthorsAction = (payload) => ({ type: GET_AUTHORS, payload });
