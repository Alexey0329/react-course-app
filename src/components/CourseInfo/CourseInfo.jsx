import styles from './CourseInfo.module.css';
import Button from '../../common/Button/Button';
import { formatTime } from '../../helpers/getSourseDuration';
import { modifyDateFormat } from '../../helpers/formatCreationDate';

const CourseInfo = (props) => {
	return (
		<div className={styles.info}>
			<div className={styles.title}>{props.course.title} </div>
			<div className={styles.infoCard}>
				<div className={styles.description}>
					<div className={styles.descriptionLabel}>Description:</div>
					{props.course.description}
				</div>
				<div className={styles.details}>
					<div className={styles.id}>
						<strong>ID:</strong>
						<span>{props.course.id}</span>
					</div>
					<div className={styles.duration}>
						<strong>Duration:</strong>
						<span>{formatTime(props.course.duration)}</span>
					</div>
					<div className={styles.created}>
						<strong>Created:</strong>
						<span>{modifyDateFormat(props.course.creationDate)}</span>
					</div>
					<div className={styles.authors}>
						<strong>Authors:</strong>
						<span>{props.course.authors}</span>
					</div>
				</div>
			</div>
			<Button label='Back' onClick={() => props.onBackClick(props)} />
		</div>
	);
};

export default CourseInfo;
