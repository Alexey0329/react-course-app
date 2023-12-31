import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { LOGIN_LABEL } from '../../constants';
import { userRegistration } from '../../store/user/thunk';

import styles from './Registration.css';

const Registration = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState({
		name: '',
		email: '',
		password: '',
		server: '',
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredErrors = {
			name: formData.name ? '' : 'Name is required',
			email: formData.email ? '' : 'Email is required',
			password: formData.password ? '' : 'Password is required',
		};
		if (
			requiredErrors.name ||
			requiredErrors.email ||
			requiredErrors.password
		) {
			setFormErrors(requiredErrors);
		} else {
			dispatch(userRegistration({ formData, navigate }));
		}
	};

	return (
		<div className='registration-form-container'>
			<div className='title'>Registration</div>
			<div className='registration-form' onSubmit={handleSubmit}>
				<div className='input-group'>
					<Input
						label='Name'
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						error={formErrors.name}
					/>
				</div>
				<div className='input-group'>
					<Input
						label='Email'
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						error={formErrors.email}
					/>
				</div>
				<div className='input-group'>
					<Input
						label='Password'
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						error={formErrors.password}
					/>
				</div>
				<div className='error input-group'>{formErrors.server}</div>
				<div className='input-group'>
					<Button
						className={styles.loginButton}
						onClick={handleSubmit}
						label={LOGIN_LABEL}
					/>
				</div>

				<div className='input-group'>
					If you have any account you may <Link to='/login'>Login</Link>
				</div>
			</div>
		</div>
	);
};

export default Registration;
