import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';
import { ADD_NEW_COURSE_LABEL } from '../../../../constants';
import { getUser } from '../../../../store/selectors';

import styles from './EmptyCoursesList.module.css';

const EmptyCoursesList = () => {
	const user = useSelector(getUser);
	const [showButton, setShowButton] = useState(true);
	const navigate = useNavigate();

	const isUserAdmin = () => {
		return user?.role?.toLowerCase() === 'admin';
	};

	const handleCreateNewCourse = () => {
		if (isUserAdmin()) {
			navigate('/courses/add');
		} else {
			setShowButton(false);
		}
	};

	return (
		<div className={styles.emptyCoursesList}>
			<div className={styles.title}>Your List Is Empty</div>
			<div className={styles.description}>
				Please use 'Add New Course' button to add new course
			</div>
			{/* FIXME - how to display OR BUTTON OR text in a better way ? */}
			{showButton && (
				<Button label={ADD_NEW_COURSE_LABEL} onClick={handleCreateNewCourse} />
			)}
			{!showButton && (
				<div>
					You don't have permissions to create a course. Please log in as ADMIN
				</div>
			)}
		</div>
	);
};

export default EmptyCoursesList;
