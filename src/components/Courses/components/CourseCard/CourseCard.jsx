import React from 'react';
import Button from '../../../../common/Button/Button';
import styles from './CourseCard.module.css';
import { modifyDateFormat } from '../../../../helpers/formatCreationDate';
import { formatTime } from '../../../../helpers/getSourseDuration';
import trash from '../../../../assets/trash.png';
import edit from '../../../../assets/edit.png';
import { SHOW_COURSE_LABEL } from '../../../../constants';
import PropTypes from 'prop-types';

const CourseCard = (props) => {
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
							onClick={() => props.onInfoClick(props)}
						/>
						<Button className={styles.btnTrash} imagePath={trash} />
						<Button className={styles.btnEdit} imagePath={edit} />
					</div>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.string,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	onInfoClick: PropTypes.func,
};

export default CourseCard;
