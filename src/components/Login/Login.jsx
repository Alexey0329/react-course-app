import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { LOGIN_LABEL } from '../../constants';
import { userLogin } from '../../store/user/thunk';

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
			dispatch(userLogin({ formData: formData, navigate: navigate }));
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
