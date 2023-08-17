import React, { useState } from 'react';
import './CreateCourse.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import {
	CANCEL_LABEL,
	CREATE_AUTHOR_LABEL,
	CREATE_COURSE_LABEL,
	mockedAuthorsList,
	mockedCoursesList,
	SERVER_URL,
} from '../../constants';
import { formatTime } from '../../helpers/getSourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import PropTypes from 'prop-types';

const CreateCourse = (props) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		duration: '',
		authorsList: [],
	});
	const [newAuthor, setNewAuthor] = useState('');

	const [availableAuthors, setAvailableAuthors] = useState([
		...mockedAuthorsList,
	]);

	const [formErrors, setFormErrors] = useState({
		title: '',
		description: '',
		duration: '',
		author: '',
	});

	const handleAuthorsChange = (event) => {
		setNewAuthor(event.target.value);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
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
			// fake update
			props.onAddCourse(formData);

			//server doesnt work
			const response = await fetch(`${SERVER_URL}/courses/add`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();
			if (result.successful) {
				console.log(result);
			} else {
				console.log(result);
			}
		}
	};

	const handleCreateAuthor = async () => {
		//server doesnt work
		const response = await fetch(`${SERVER_URL}/authors/add`, {
			method: 'POST',
			body: JSON.stringify({ name: newAuthor }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		if (result.successful) {
			console.log(result);
		} else {
			setFormErrors({ server: result.result, login: result.errors });
		}
		// add fake data to mocked list
		let randomUUID = crypto['randomUUID']();
		setAvailableAuthors([
			{ name: newAuthor, id: randomUUID },
			...availableAuthors,
		]);
	};
	const navigate = useNavigate();
	const handleCancel = (e) => {
		navigate('/courses');
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
						authorsList: [current, ...formData.authorsList],
					});
				}}
				onRemove={() =>
					setFormData({
						...formData,
						authorsList: [
							...formData.authorsList.filter(
								(author) => author.id !== current.id
							),
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
										error={formErrors.author}
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
								{[
									...new Set(formData.authorsList.map((auth) => auth.name)),
								].map((uniqueName) => (
									<div key={uniqueName}>{uniqueName}</div>
								))}
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

CreateCourse.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
	name: PropTypes.string,
	uniqueName: PropTypes.string,
	id: PropTypes.string,
	author: PropTypes.exact({
		name: PropTypes.string,
		id: PropTypes.string,
	}),
};

export default CreateCourse;
