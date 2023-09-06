import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthors, addAuthor } from './thunk';

export const initialState = { authors: [] };

const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.fulfilled, (state, action) => {
				state.authors = action.payload;
			})
			.addCase(addAuthor.fulfilled, (state, action) => {
				state.authors.push(action.payload);
			});
	},
});

export default authorsSlice.reducer;
