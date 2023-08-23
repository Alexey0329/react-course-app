import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Logo from './components/Logo/logo';
import Button from '../../common/Button/Button';
import { LOGOUT_LABEL, LOGIN_LABEL } from '../../constants';
import { userLogoutAction } from '../../store/user/actions';
import { getUser } from '../../store/selectors';

import styles from './Header.module.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/courseLogo.png');

const Header = () => {
	const [userName, setUserName] = useState('');
	const [isAuthorized, setIsAuthorized] = useState(false);
	const userToken = localStorage.getItem('userToken');
	const name = localStorage.getItem('userName');

	const user = useSelector(getUser);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsAuthorized(!!userToken);
		setUserName(name);
	}, [userToken, name]);

	const navigate = useNavigate();

	const handleButtonClick = () => {
		if (isAuthorized) {
			localStorage.removeItem('userToken');
			localStorage.removeItem('isAdmin');
			localStorage.removeItem('userName');
			setIsAuthorized(false);
			dispatch(userLogoutAction());
			setUserName('');
			navigate('/');
		} else {
			setIsAuthorized(true);
			setUserName(userName);
		}
	};
	return (
		<div className={styles.header}>
			<Logo url={logo} name='Course logo' />
			<div className={styles.rightBlock}>
				<div className={styles.username}> {userName} </div>
				{isAuthorized && (
					<Button
						onClick={handleButtonClick}
						label={isAuthorized ? LOGOUT_LABEL : LOGIN_LABEL}
					/>
				)}
			</div>
		</div>
	);
};

export default Header;
