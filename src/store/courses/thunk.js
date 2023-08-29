import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	GET_COURSES,
	ADD_NEW_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './types';
import { API_URL } from '../../constants';

export const fetchCourses = createAsyncThunk(
	GET_COURSES,
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/courses/all`);
			const data = await response.json();
			return data.result;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const addCourse = createAsyncThunk(
	ADD_NEW_COURSE,
	async (course, { rejectWithValue }) => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('userToken'),
			},
			body: JSON.stringify(course),
		};
		try {
			const response = await fetch(`${API_URL}/courses/add`, requestOptions);
			const data = await response.json();
			return data.result;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const deleteCourse = createAsyncThunk(
	DELETE_COURSE,
	async (courseId, { rejectWithValue }) => {
		const requestOptions = {
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('userToken'),
			},
		};
		try {
			const response = await fetch(
				`${API_URL}/courses/${courseId}`,
				requestOptions
			);
			const data = await response.json();
			if (data.successful) {
				return courseId;
			}
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const updateCourse = createAsyncThunk(
	UPDATE_COURSE,
	async ({ course, courseId }, { rejectWithValue }) => {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('userToken'),
			},
			body: JSON.stringify(course),
		};
		try {
			const response = await fetch(
				`${API_URL}/courses/${courseId}`,
				requestOptions
			);
			const data = await response.json();
			return data.result;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
