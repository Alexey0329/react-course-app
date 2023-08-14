import Button from '../../../../common/Button/Button';
import styles from './EmptyCoursesList.module.css';

const EmptyCoursesList = () => {
	return (
		<div className={styles.emptyCoursesList}>
			<div className={styles.title}>Your List Is Empty</div>
			<div className={styles.description}>
				Please use 'Add New Course' button to add new course
			</div>
			<Button label='Add New Course' />
		</div>
	);
};

export default EmptyCoursesList;
