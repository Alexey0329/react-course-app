import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import { formatTime } from '../../helpers/getSourseDuration';
import { modifyDateFormat } from '../../helpers/formatCreationDate';
import { BACK_LABEL } from '../../constants';
import { getAuthors, getCourses } from '../../store/selectors';

import styles from './CourseInfo.module.css';

const CourseInfo = () => {
	const navigate = useNavigate();
	const courses = useSelector(getCourses);
	const allAuthors = useSelector(getAuthors);
	const params = useParams();
	const prodId = params.courseId;
	const foundCourse = courses.find((course) => course.id === prodId);
	const authors = foundCourse.authors.map(
		(author) => allAuthors.find((auth) => auth.id === author).name
	);
	const course = Object.assign({}, foundCourse);
	course.authors = authors.join(', ');
	const handleBackClick = () => {
		navigate(`/courses`);
	};

	return (
		<div className={styles.info}>
			<div className={styles.title}>{course.title} </div>
			<div className={styles.infoCard}>
				<div className={styles.description}>
					<div className={styles.descriptionLabel}>Description:</div>
					{course.description}
				</div>
				<div className={styles.details}>
					<div className={styles.id}>
						<strong>ID:</strong>
						<span>{course.id}</span>
					</div>
					<div className={styles.duration}>
						<strong>Duration:</strong>
						<span>{formatTime(course.duration)}</span>
					</div>
					<div className={styles.created}>
						<strong>Created:</strong>
						<span>{modifyDateFormat(course.creationDate || '01/01/1970')}</span>
					</div>
					<div className={styles.authors}>
						<strong>Authors:</strong>
						<span>{course.authors}</span>
					</div>
				</div>
			</div>
			<Button
				className='back-button'
				label={BACK_LABEL}
				onClick={handleBackClick}
				imagePath={undefined}
			/>
		</div>
	);
};

export default CourseInfo;
