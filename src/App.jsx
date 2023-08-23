import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CreateCourse from './components/CreateCourse/CreateCourse';

import './App.css';

function App() {
	const navigate = useNavigate(); // FIXME - comment this string and try to login/logout

	const userToken = localStorage.getItem('userToken');

	return (
		<div>
			<Header />
			<Routes>
				<Route
					path='/'
					element={userToken ? <Navigate to='/courses' /> : <Login />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/courses' element={userToken ? <Courses /> : <Login />} />

				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route path='/courses/add' element={<CreateCourse />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</div>
	);
}

export default App;
