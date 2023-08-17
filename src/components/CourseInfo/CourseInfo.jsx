import styles from './CourseInfo.module.css';
import Button from '../../common/Button/Button';
import { formatTime } from '../../helpers/getSourseDuration';
import { modifyDateFormat } from '../../helpers/formatCreationDate';
import { BACK_LABEL, mockedAuthorsList } from '../../constants';
import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseInfo = (props) => {
	const params = useParams();
	const prodId = params.courseId;
	let foundCourse = props.coursesList.find((course) => course.id === prodId);

	let authors = foundCourse.authors.map(
		(author) => mockedAuthorsList.find((auth) => auth.id === author).name
	);

	let course = Object.assign({}, foundCourse);
	course.authors = authors.join(', ');

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
				onClick={() => props.onBackClick(props)}
				imagePath={undefined}
			/>
		</div>
	);
};

CourseInfo.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	id: PropTypes.string,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	authors: PropTypes.arrayOf(PropTypes.string),
};

export default CourseInfo;
