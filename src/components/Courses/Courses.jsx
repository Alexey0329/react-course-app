import CourseCard from './components/CourseCard/CourseCard';
import EmptyCoursesList from './components/EmptyList/EmptyCoursesList';
import React from 'react';
import styles from './Courses.module.css';
import Button from '../../common/Button/Button';
import { ADD_NEW_COURSE_LABEL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const getAuthorsNameList = (authorsIds, authorsList) => {
	return (
		authorsIds?.map((id) => {
			return (
				authorsList.find((author) => id === author.id).name || 'Unknown Author'
			);
		}) || []
	);
};

const Courses = ({ onInfoClick, coursesList, authorsList }) => {
	const navigate = useNavigate();
	const handleCreateNewCourse = () => {
		navigate('/courses/add');
	};
	const isUserAdmin = () => {
		return localStorage.getItem('isAdmin');
	};

	if (coursesList.length > 0) {
		const listItems = coursesList.map((course) => (
			<CourseCard
				key={course.id}
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
					{isUserAdmin() && (
						<Button
							onClick={handleCreateNewCourse}
							className={styles.addCourseButton}
							label={ADD_NEW_COURSE_LABEL}
						/>
					)}
				</div>

				<div>{listItems}</div>
			</div>
		);
	} else {
		return <EmptyCoursesList />;
	}
};

Courses.propTypes = {
	key: PropTypes.string,
	title: PropTypes.string,
	id: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.arrayOf(PropTypes.string),
	duration: PropTypes.number,
	creationDate: PropTypes.string,
};

export default Courses;
