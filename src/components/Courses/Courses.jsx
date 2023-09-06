import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import EmptyCoursesList from './components/EmptyList/EmptyCoursesList';
import Button from '../../common/Button/Button';
import { ADD_NEW_COURSE_LABEL } from '../../constants';
import { getCourses, getAuthors, getUser } from '../../store/selectors';
import { getAuthorsNameList } from '../../helpers/authorsConvert';
import { fetchAuthors } from '../../store/authors/thunk';
import { fetchCourses } from '../../store/courses/thunk';
import LoadingComponent from '../../common/Loading/Loading';

import styles from './Courses.module.css';

const Courses = () => {
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const user = useSelector(getUser);

	const dispatch = useDispatch();

	React.useEffect(() => {
		(async () => {
			dispatch(fetchCourses());
			dispatch(fetchAuthors());
		})();
	}, [dispatch]);

	const navigate = useNavigate();
	const handleCreateNewCourse = () => {
		navigate('/courses/add');
	};

	const isUserAdmin = () => {
		return user?.role?.toLowerCase() === 'admin';
	};

	if (authors?.length === 0 || courses?.length === 0) {
		return <LoadingComponent />;
	}
	if (authors?.length > 0 && courses?.length > 0) {
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
