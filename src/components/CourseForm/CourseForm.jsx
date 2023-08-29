import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import {
	CANCEL_LABEL,
	CREATE_AUTHOR_LABEL,
	CREATE_COURSE_LABEL,
} from '../../constants';
import { formatTime } from '../../helpers/getSourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { getAuthors, getCourses } from '../../store/selectors';
import { addAuthor } from '../../store/authors/thunk';
import { addCourse, updateCourse } from '../../store/courses/thunk';

import styles from './CourseForm.module.css';

const CourseForm = (props) => {
	const params = useParams();
	const courseId = params.courseId;
	const courses = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const dispatch = useDispatch();
	const availableAuthors = useSelector(getAuthors);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		duration: '',
		authors: [],
	});

	useEffect(() => {
		if (!props.isCreate) {
			const course = courses.find((c) => c.id === courseId);
			const { title, description, duration, authors } = course;
			let authorsObj = authorsList.filter((author) =>
				authors.includes(author.id)
			);
			const formData = { title, description, duration, authors: authorsObj };
			setFormData(formData);
		}
	}, [props.isCreate, courseId, courses, authorsList]);

	const [newAuthor, setNewAuthor] = useState('');

	const [formErrors, setFormErrors] = useState({
		title: '',
		description: '',
		duration: '',
		authors: '',
	});

	const handleCancel = (e) => {
		navigate('/courses');
	};

	const handleAuthorsChange = (event) => {
		setNewAuthor(event.target.value);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		if (name === 'duration') {
			setFormData((formData) => ({
				...formData,
				[name]: parseInt(value, 10),
			}));
		} else {
			setFormData((formData) => ({
				...formData,
				[name]: value,
			}));
		}
	};

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const requiredErrors = {
			title: formData.title ? '' : 'Title is required',
			description: formData.description ? '' : 'Description is required',
			duration: formData.duration ? '' : 'Duration is required',
		};
		if (
			requiredErrors.title ||
			requiredErrors.description ||
			requiredErrors.duration
		) {
			setFormErrors(requiredErrors);
		} else {
			const authorIds = formData.authors.map((author) => author.id);
			const fdata = {
				...formData,
				authors: authorIds,
			};
			if (!props.isCreate) {
				dispatch(updateCourse({ course: fdata, courseId: courseId }));
			} else {
				dispatch(addCourse(fdata));
			}
			navigate('/courses');
		}
	};

	const handleCreateAuthor = async () => {
		const authorToCreate = {
			name: newAuthor,
		};
		dispatch(addAuthor(authorToCreate));
		setNewAuthor('');
	};

	const availableAuthorsList = availableAuthors.map((current) => {
		const isAuthorAdded = formData.authors.some(
			(author) => author.id === current.id
		);
		return (
			<AuthorItem
				key={current.id}
				id={current.id}
				name={current.name}
				onAdd={() => {
					if (!isAuthorAdded) {
						setFormData({
							...formData,
							authors: [current, ...formData.authors],
						});
					}
				}}
				onRemove={() =>
					setFormData({
						...formData,
						authors: [
							...formData.authors.filter((author) => author.id !== current.id),
						],
					})
				}
			/>
		);
	});

	return (
		<div className={styles.editFormContainer}>
			<div className={styles.editFormPage}>
				<div className={styles.title}>Course Edit/Create Page</div>
				<div className={styles.editForm}>
					<div className={styles.editBlock}>Main Info</div>
					<div className={styles.mainInfoContainer}>
						<label>Title:</label>
						<input
							className={styles.mainInfoInput}
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
						/>
						<div className={styles.error}>{formErrors.title}</div>

						<label>Description:</label>
						<textarea
							className={styles.mainInfoInput}
							id='description'
							name='description'
							value={formData.description}
							onChange={handleInputChange}
						/>
						<div className={styles.error}>{formErrors.description}</div>
					</div>
					<div className={styles.durationContainer}>
						<div className={styles.editBlock}>Duration</div>
						<div className={styles.editInputGroup}>
							<label>Duration:</label>
							<input
								type='text'
								id='duration'
								name='duration'
								value={formData.duration}
								onChange={handleInputChange}
							/>{' '}
							<span>{formatTime(formData.duration)}</span>
							<div className={styles.error}>{formErrors.duration}</div>
						</div>
					</div>

					<div className={styles.authorsContainer}>
						<div className={styles.authorsContainerLeft}>
							<div className={styles.editBlock}>Authors</div>
							<div className={styles.authorsInputGroup}>
								<div className={styles.editInputGroup}>
									<Input
										label='Authors Name'
										type='text'
										id='author'
										name='author'
										value={newAuthor}
										onChange={handleAuthorsChange}
										error={formErrors.authors}
									/>
								</div>
								<span>
									{' '}
									<Button
										onClick={handleCreateAuthor}
										label={CREATE_AUTHOR_LABEL}
									/>
								</span>
							</div>
						</div>
						<div className={styles.authorsContainerRight}>
							<div className={styles.editBlock}>Course Authors</div>
							<div className={styles.editInputGroup}>
								{[...new Set(formData.authors.map((auth) => auth.name))].map(
									(uniqueName) => (
										<div key={uniqueName}>{uniqueName}</div>
									)
								)}
							</div>
						</div>
					</div>
					<div className={styles.authorsListContainer}>
						<div className={styles.editBlock}>Authors List</div>
						<div>{availableAuthorsList}</div>
					</div>
				</div>
				<div className={styles.actionButtons}>
					<Button onClick={handleCreateCourse} label={CREATE_COURSE_LABEL} />
					<Button onClick={handleCancel} label={CANCEL_LABEL} />
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
