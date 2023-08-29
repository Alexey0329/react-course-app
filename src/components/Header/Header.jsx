import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Logo from './components/Logo/logo';
import Button from '../../common/Button/Button';
import { LOGOUT_LABEL, LOGIN_LABEL } from '../../constants';
import { userLogout, loadUser } from '../../store/user/thunk';
import { getUser } from '../../store/selectors';

import styles from './Header.module.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/courseLogo.png');

const Header = () => {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const userToken = localStorage.getItem('userToken');

	const user = useSelector(getUser);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsAuthorized(!!userToken);
		dispatch(loadUser());
	}, [userToken, dispatch]);

	const navigate = useNavigate();

	const handleButtonClick = async () => {
		dispatch(userLogout(navigate));
		setIsAuthorized(false);
	};
	return (
		<div className={styles.header}>
			<Logo url={logo} name='Course logo' />
			{isAuthorized && (
				<div className={styles.rightBlock}>
					<div className={styles.username}> {user?.name || 'N/A'} </div>
					<Button
						onClick={handleButtonClick}
						label={isAuthorized ? LOGOUT_LABEL : LOGIN_LABEL}
					/>{' '}
				</div>
			)}
		</div>
	);
};

export default Header;
