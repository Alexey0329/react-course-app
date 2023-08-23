import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../common/Button/Button';
import { ADD_NEW_COURSE_LABEL } from '../../../../constants';

import styles from './EmptyCoursesList.module.css';

const EmptyCoursesList = () => {
	const [showButton, setShowButton] = useState(true);
	const navigate = useNavigate();

	// on refresh user state info is lost
	const isUserAdmin = () => {
		return localStorage.getItem('isAdmin');
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

EmptyCoursesList.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default EmptyCoursesList;
