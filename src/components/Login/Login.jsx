import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { LOGIN_LABEL } from '../../constants';
import { userLoginAction } from '../../store/user/actions';
import { loginRequest } from '../../services';

import './Login.css';

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
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredErrors = {
			email: formData.email ? '' : 'Email is required',
			password: formData.password ? '' : 'Password is required',
		};
		if (requiredErrors.email || requiredErrors.password) {
			setFormErrors(requiredErrors);
		} else {
			const result = await loginRequest(formData);
			if (result.successful) {
				localStorage.setItem('userToken', result.result);
				// use localStorage because of bug. on refresh user state info is lost
				localStorage.setItem('userName', result.user?.name);
				if (
					result.user?.name?.toLowerCase().includes('admin') ||
					result.user?.email?.includes('admin')
				) {
					localStorage.setItem('isAdmin', true);
				}
				dispatch(userLoginAction(result.user));
				navigate('/courses');
			} else {
				setFormErrors({ server: result.result, login: result.errors });
			}
		}
	};
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

export default Login;
