import coursesSlice from '../store/courses/slice.js';
import authorsSlice from '../store/authors/slice.js';
import userSlice from './user/slice.js';
export const rootReducer = {
	courses: coursesSlice,
	authors: authorsSlice,
	user: userSlice,
};
