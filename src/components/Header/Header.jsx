import React, { useState, useEffect } from 'react';
import Logo from './components/Logo/logo';
import Button from '../../common/Button/Button';
import styles from './Header.module.css';
import { LOGOUT_LABEL, LOGIN_LABEL } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/courseLogo.png');

const Header = (props) => {
	const [userName, setUserName] = useState('');
	const [isAuthorized, setIsAuthorized] = useState(false);
	const userToken = localStorage.getItem('userToken');
	// FIXME - better way to handle userName after user is logged in, how to pass it in header ?
	const name = localStorage.getItem('userName');

	const location = useLocation();
	console.log('Location' + JSON.stringify(location));

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
			setUserName('');
			navigate('/');
		} else {
			setIsAuthorized(true);
			setUserName(name);
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

Header.propTypes = {
	name: PropTypes.string,
	logo: PropTypes.string,
	userName: PropTypes.string,
	onClick: PropTypes.func,
};

export default Header;
