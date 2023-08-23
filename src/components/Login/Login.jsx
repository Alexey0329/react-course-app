import React, { useState } from 'react';
import './Login.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_LABEL, SERVER_URL } from '../../constants';
import PropTypes from 'prop-types';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState({
		email: '',
		password: '',
		server: '',
		login: '',
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
			email: formData.email ? '' : 'Email is required',
			password: formData.password ? '' : 'Password is required',
		};
		if (requiredErrors.email || requiredErrors.password) {
			setFormErrors(requiredErrors);
		} else {
			const response = await fetch(`${SERVER_URL}/login`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();
			if (result.successful) {
				localStorage.setItem('userToken', result.result);
				localStorage.setItem('userName', result.user.name);
				if (result.user.name.toLowerCase().includes('admin')) {
					localStorage.setItem('isAdmin', true);
				}
				navigate('/courses');
			} else {
				setFormErrors({ server: result.result, login: result.errors });
			}
		}
	};

	// FIXME - is there any other way to write large forms ?
	return (
		<div className='login-form-container'>
			<div className='title'>Login</div>
			<div className='login-form' onSubmit={handleSubmit}>
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
				<div className='error input-group'>{formErrors.login}</div>
				<div className='input-group'>
					<Button onClick={handleSubmit} label={LOGIN_LABEL} />
				</div>
				<div className='input-group'>
					If you have any account you may{' '}
					<Link to='/registration'>Registration</Link>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	server: PropTypes.string,
	login: PropTypes.string,
	password: PropTypes.string,
	email: PropTypes.string,
};

export default Login;
