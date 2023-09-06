import { createSlice } from '@reduxjs/toolkit';

import { userLogin, userRegistration, userLogout, loadUser } from './thunk';

export const initialState = {
	user: { isAuth: false, name: '', email: '', token: '', role: '' },
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(userLogin.rejected, (state, action) => {
				// save To Store, from store show On UI
				console.log('Login error ' + JSON.stringify(action.payload.result));
			})
			.addCase(userRegistration.fulfilled, (state, action) => {
				console.log('Registered');
			})
			.addCase(userRegistration.rejected, (state, action) => {
				console.log(
					'Registration error ' + JSON.stringify(action.payload.errors)
				);
			})
			.addCase(userLogout.fulfilled, (state, action) => {
				console.log('Logout');
				state.user = initialState;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.user = action.payload;
			});
	},
});

export default userSlice.reducer;
