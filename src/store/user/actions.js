import { USER_LOGIN, USER_LOGOUT } from './types';

export const userLoginAction = (payload) => ({ type: USER_LOGIN, payload });
export const userLogoutAction = () => ({ type: USER_LOGOUT });
