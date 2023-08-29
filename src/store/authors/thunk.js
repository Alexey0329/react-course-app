import { createAsyncThunk } from '@reduxjs/toolkit';

import { GET_AUTHORS, ADD_NEW_AUTHOR } from './types';
import { API_URL } from '../../constants';

export const fetchAuthors = createAsyncThunk(
	GET_AUTHORS,
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/authors/all`);
			const data = await response.json();
			return data.result;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const addAuthor = createAsyncThunk(
	ADD_NEW_AUTHOR,
	async (author, { rejectWithValue }) => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('userToken'),
			},
			body: JSON.stringify(author),
		};
		try {
			const response = await fetch(`${API_URL}/authors/add`, requestOptions);
			const data = await response.json();
			return data.result;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
