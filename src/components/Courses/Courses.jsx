import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import EmptyCoursesList from './components/EmptyList/EmptyCoursesList';
import Button from '../../common/Button/Button';
import { ADD_NEW_COURSE_LABEL } from '../../constants';
import { getCoursesAction } from '../../store/courses/actions';
import { getAuthorsAction } from '../../store/authors/actions';
import { getCourses, getAuthors, getUser } from '../../store/selectors';
import { getCoursesList, getAuthorsList } from '../../services';

import styles from './Courses.module.css';

const getAuthorsNameList = (authorsIds, authorsList) => {
	return (
		authorsIds?.map((id) => {
			return (
				authorsList?.find((author) => id === author.id)?.name ||
				'Unknown Author'
			);
		}) || []
	);
};

const Courses = () => {
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const user = useSelector(getUser);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const coursesResponse = await getCoursesList();
			const authorsResponse = await getAuthorsList();
			dispatch(getCoursesAction(coursesResponse));
			dispatch(getAuthorsAction(authorsResponse));
		})();
	}, [dispatch]);

	const navigate = useNavigate();
	const handleCreateNewCourse = () => {
		navigate('/courses/add');
	};

	// use localStorage because of bug. on refresh user state info is lost
	const isUserAdmin = () => {
		return localStorage.getItem('isAdmin');
		// return user.role === 'admin';
	};

	if (courses.length > 0) {
		const listItems = courses.map((course) => (
			<CourseCard
				key={course.id}
				title={course.title}
				id={course.id}
				description={course.description}
				authors={getAuthorsNameList(course.authors, authors).join(', ')}
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

export default Courses;
