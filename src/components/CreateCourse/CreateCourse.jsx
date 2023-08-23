import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import {
	CANCEL_LABEL,
	CREATE_AUTHOR_LABEL,
	CREATE_COURSE_LABEL,
} from '../../constants';
import { formatTime } from '../../helpers/getSourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';

import { addNewCourseAction } from '../../store/courses/actions';
import { addNewAuthorAction } from '../../store/authors/actions';
import { getAuthors } from '../../store/selectors';
import { createAuthor, createCourse } from '../../services';

import './CreateCourse.css';

const CreateCourse = () => {
	const dispatch = useDispatch();
	const availableAuthors = useSelector(getAuthors);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		duration: '',
		authors: [],
	});
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
			const courseResponse = await createCourse(fdata);
			console.log(courseResponse);
			if (courseResponse.successful) {
				dispatch(addNewCourseAction(courseResponse.result));
				navigate('/courses');
			} else {
				console.log(courseResponse);
			}
		}
	};

	const handleCreateAuthor = async () => {
		const authorToCreate = {
			name: newAuthor,
		};
		const authorResponse = await createAuthor(authorToCreate);
		if (authorResponse.successful) {
			dispatch(addNewAuthorAction(authorResponse.result));
			setNewAuthor('');
		}
	};

	const availableAuthorsList = availableAuthors.map((current) => {
		return (
			<AuthorItem
				key={current.id}
				id={current.id}
				name={current.name}
				onAdd={() => {
					return setFormData({
						...formData,
						authors: [current, ...formData.authors],
					});
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
		<div className='edit-form-container'>
			<div className='edit-form-page'>
				<div className='title'>Course Edit/Create Page</div>
				<div className='edit-form'>
					<div className='edit-block'>Main Info</div>
					<div className='main-info-container'>
						<label>Title:</label>
						<input
							className='main-info-input'
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
						/>
						<div className='error'>{formErrors.title}</div>

						<label>Description:</label>
						<textarea
							className='main-info-input'
							id='description'
							name='description'
							value={formData.description}
							onChange={handleInputChange}
						/>
						<div className='error'>{formErrors.description}</div>
					</div>
					<div className='duration-container'>
						<div className='edit-block'>Duration</div>
						<div className='edit-input-group'>
							<label>Duration:</label>
							<input
								type='text'
								id='duration'
								name='duration'
								value={formData.duration}
								onChange={handleInputChange}
							/>{' '}
							<span>{formatTime(formData.duration)}</span>
							<div className='error'>{formErrors.duration}</div>
						</div>
					</div>

					<div className='authors-container'>
						<div className='authors-container-left'>
							<div className='edit-block'>Authors</div>
							<div className='authors-input-group'>
								<div className='edit-input-group'>
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
						<div className='authors-container-right'>
							<div className='edit-block'>Course Authors</div>
							<div className='edit-input-group'>
								{[...new Set(formData.authors.map((auth) => auth.name))].map(
									(uniqueName) => (
										<div key={uniqueName}>{uniqueName}</div>
									)
								)}
							</div>
						</div>
					</div>
					<div className='authors-list-container'>
						<div className='edit-block'>Authors List</div>
						<div>{availableAuthorsList}</div>
					</div>
				</div>
				<div className='action-buttons'>
					<Button onClick={handleCreateCourse} label={CREATE_COURSE_LABEL} />
					<Button onClick={handleCancel} label={CANCEL_LABEL} />
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
