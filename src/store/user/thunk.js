import { createAsyncThunk } from '@reduxjs/toolkit';

import { USER_LOGIN, USER_LOGOUT, GET_USER, USER_REGISTRATION } from './types';
import { API_URL } from '../../constants';

export const userLogin = createAsyncThunk(
	USER_LOGIN,
	async ({ formData, navigate }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/login`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (result.successful) {
				localStorage.setItem('userToken', result.result);
				navigate('/courses');
				return result;
			} else {
				return rejectWithValue(result);
			}
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const userRegistration = createAsyncThunk(
	USER_REGISTRATION,
	async ({ formData, navigate }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/register`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (result.successful) {
				navigate('/login');
				return result;
			} else {
				return rejectWithValue(result);
			}
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const userLogout = createAsyncThunk(
	USER_LOGOUT,
	async (navigate, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/logout`, {
				method: 'DELETE',
				headers: {
					Authorization: localStorage.getItem('userToken'),
				},
			});
			localStorage.removeItem('userToken');
			navigate('/');
			if (response.status === 200) {
				return response;
			}
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const loadUser = createAsyncThunk(
	GET_USER,
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/users/me`, {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('userToken'),
				},
			});
			const result = await response.json();
			return result.result;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
