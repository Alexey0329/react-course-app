import { USER_LOGIN, USER_LOGOUT } from './types';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			let token = localStorage.getItem('userToken');
			let role =
				action.payload.role ||
				(action.payload?.name?.includes('admin') || // currently server does nor provide role field for user, so it`s not clear
				// how to determire what are available permissions for him. So it`s dumb check for word 'admin' in credentials
				action.payload?.email?.includes('admin')
					? 'admin'
					: 'user');
			return {
				isAuth: true,
				name: action.payload.name || 'N/A',
				email: action.payload.email,
				role: role,
				token: token,
			};

		case USER_LOGOUT:
			return userInitialState;
		default:
			return state;
	}
};
