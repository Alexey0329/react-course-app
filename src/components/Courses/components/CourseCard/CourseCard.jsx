import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../common/Button/Button';
import { modifyDateFormat } from '../../../../helpers/formatCreationDate';
import { formatTime } from '../../../../helpers/getSourseDuration';
import trash from '../../../../assets/trash.png';
import edit from '../../../../assets/edit.png';
import { SHOW_COURSE_LABEL } from '../../../../constants';
import { deleteCourse } from '../../../../store/courses/thunk';
import { getUser } from '../../../../store/selectors';

import styles from './CourseCard.module.css';

const CourseCard = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(getUser);

	const handleDeleteCourse = (id) => {
		dispatch(deleteCourse(id));
	};
	const handleUpdateCourse = (id) => {
		navigate(`/courses/update/${id}`);
	};

	const handleInfoClick = (id) => {
		navigate(`/courses/${id}`);
	};

	const isUserAdmin = () => {
		return user?.role?.toLowerCase() === 'admin';
	};

	return (
		<div className={styles.courseCard}>
			<div className={styles.title}>{props.title}</div>
			<div className={styles.courseCardContent}>
				<div className={styles.description}>
					<div className={styles.descriptionTxt}>{props.description}</div>
				</div>
				<div className={styles.info}>
					<div>
						<strong>Authors:</strong> {props.authors}
					</div>
					<div>
						<strong>Duration:</strong> {formatTime(props.duration)}
					</div>
					<div>
						<strong>Created:</strong>{' '}
						{modifyDateFormat(props.creationDate || '01/01/1970')}
					</div>
					<div className={styles.buttons}>
						<Button
							label={SHOW_COURSE_LABEL}
							onClick={() => handleInfoClick(props.id)}
						/>
						{isUserAdmin() && (
							<Button
								className={styles.btnTrash}
								imagePath={trash}
								onClick={() => handleDeleteCourse(props.id)}
							/>
						)}
						{isUserAdmin() && (
							<Button
								className={styles.btnEdit}
								imagePath={edit}
								onClick={() => handleUpdateCourse(props.id)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
