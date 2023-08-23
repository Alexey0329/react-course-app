import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import styles from './Registration.css';
import { LOGIN_LABEL, SERVER_URL } from '../../constants';
import PropTypes from 'prop-types';

const Registration = (props) => {
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
			const response = await fetch(`${SERVER_URL}/register`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();
			if (result.successful) {
				navigate('/login');
			} else {
				setFormErrors({ server: result.errors });
			}
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

Registration.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	onClick: PropTypes.func,
};

export default Registration;
