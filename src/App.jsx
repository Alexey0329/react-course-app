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

function App() {
	const [selectedItemUuid, setSelectedItemUuid] = useState('');
	const [showInfo, setShowInfo] = useState(false);

	const handleInfoClick = (course) => {
		setSelectedItemUuid(course);
		setShowInfo(true);
	};

	const handleBackClick = () => {
		setSelectedItemUuid('');
		setShowInfo(false);
	};

	return (
		<div>
			<Header />
			{!showInfo && (
				<Courses
					coursesList={mockedCoursesList}
					authorsList={mockedAuthorsList}
					onInfoClick={handleInfoClick}
				/>
			)}
			{showInfo && (
				<CourseInfo course={selectedItemUuid} onBackClick={handleBackClick} />
			)}
		</div>
	);
}

export default App;
