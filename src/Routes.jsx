import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseForm from './components/CourseForm/CourseForm';
import PrivateRoute from './PrivateRoute';

export const AppRoutes = () => {
	const navigate = useNavigate(); // FIXME - comment this string and try to login/logout

	const userToken = localStorage.getItem('userToken');
	return (
		<Routes>
			<Route
				path='/'
				element={userToken ? <Navigate to='/courses' /> : <Login />}
			/>
			<Route path='/registration' element={<Registration />} />
			<Route path='/login' element={<Login />} />
			<Route path='/courses' element={userToken ? <Courses /> : <Login />} />

			<Route path='/courses/:courseId' element={<CourseInfo />} />
			<Route
				path='/courses/update/:courseId'
				element={
					<PrivateRoute>
						<CourseForm isCreate={false} />
					</PrivateRoute>
				}
			/>
			<Route
				path='/courses/add'
				element={
					<PrivateRoute>
						<CourseForm isCreate={true} />
					</PrivateRoute>
				}
			/>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
