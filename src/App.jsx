import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import {
	mockedCoursesList,
	mockedAuthorsList,
	// mockedCoursesListEmpty,
} from './constants';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CreateCourse from './components/CreateCourse/CreateCourse';
import PropTypes from 'prop-types';

function App() {
	const [coursesList, setCoursesList] = useState([...mockedCoursesList]);

	const navigate = useNavigate();
	const handleInfoClick = (course) => {
		navigate(`/courses/${course.id}`);
	};

	const handleBackClick = () => {
		navigate(`/courses`);
	};

	const handleAddCourse = (course) => {
		setCoursesList([course, ...coursesList]);
		navigate(`/courses`);
	};

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
				<Route
					path='/courses'
					element={
						userToken ? (
							<Courses
								coursesList={coursesList}
								// USE this to test empty courses list
								// coursesList={mockedCoursesListEmpty}
								authorsList={mockedAuthorsList}
								onInfoClick={handleInfoClick}
							/>
						) : (
							<Login />
						)
					}
				/>

				<Route
					path='/courses/:courseId'
					element={
						<CourseInfo
							coursesList={coursesList}
							onBackClick={handleBackClick}
						/>
					}
				/>
				<Route
					path='/courses/add'
					element={<CreateCourse onAddCourse={handleAddCourse} />}
				/>
			</Routes>
		</div>
	);
}

App.propTypes = {
	userToken: PropTypes.string,
	mockedCoursesList: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			creationDate: PropTypes.string,
			duration: PropTypes.number,
			authors: PropTypes.arrayOf(PropTypes.string),
		})
	),
};

export default App;
