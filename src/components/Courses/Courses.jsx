import CourseCard from './components/CourseCard/CourseCard';
import EmptyCoursesList from './components/EmptyList/EmptyCoursesList';
// import SearchBar from './components/SearchBar/SearchBar';
import React from 'react';
import styles from './Courses.module.css';

// import {
// 	mockedCoursesList,
// 	mockedAuthorsList,
// 	// mockedCoursesListEmpty,
// } from '../../constants';
import Button from '../../common/Button/Button';

const getAuthorsNameList = (authorsIds, authorsList) => {
	return authorsIds.map((id) => {
		return (
			authorsList.find((author) => id === author.id).name || 'Unknown Author'
		);
	});
};

const Courses = ({ onInfoClick, coursesList, authorsList }) => {
	// if (mockedCoursesListEmpty.length > 0) {
	if (authorsList.length > 0) {
		const listItems = coursesList.map((course) => (
			<CourseCard
				onInfoClick={onInfoClick}
				title={course.title}
				id={course.id}
				description={course.description}
				authors={getAuthorsNameList(course.authors, authorsList).join(', ')}
				duration={course.duration}
				creationDate={course.creationDate}
			/>
		));
		return (
			<div className={styles.coursesList}>
				<div className={styles.searchBarContainer}>
					{/* <SearchBar className={styles.searchBar} /> */}
					<Button className={styles.addCourseButton} label='Add New Course' />
				</div>

				<div>{listItems}</div>
			</div>
		);
	} else {
		return <EmptyCoursesList />;
	}
};

export default Courses;
