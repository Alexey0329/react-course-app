import { createSlice } from '@reduxjs/toolkit';
import {
	fetchCourses,
	addCourse,
	deleteCourse,
	updateCourse,
} from '../courses/thunk';

export const initialState = { courses: [] };

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.courses = action.payload;
			})
			.addCase(addCourse.fulfilled, (state, action) => {
				state.courses.push(action.payload);
			})
			.addCase(deleteCourse.fulfilled, (state, action) => {
				state.courses = state.courses.filter((course) => {
					return course.id !== action.payload;
				});
			})
			.addCase(updateCourse.fulfilled, (state, action) => {
				const index = state.courses.findIndex(
					(course) => course.id === action.payload.id
				);
				if (index !== -1) {
					state.courses[index] = action.payload;
				}
			});
	},
});

export default coursesSlice.reducer;
