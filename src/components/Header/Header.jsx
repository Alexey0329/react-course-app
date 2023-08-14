import React, { useState } from 'react';
import Logo from './components/Logo/logo';
import Button from '../../common/Button/Button';
import styles from './Header.module.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/courseLogo.png');

const Header = (props) => {
	const [userName, setUserName] = useState(props.name);
	const [isAuthorized, setIsAuthorized] = useState(props.auth);

	const handleButtonClick = () => {
		if (isAuthorized) {
			setIsAuthorized(false);
			setUserName('Anonym');
		}
	};
	return (
		<div className={styles.header}>
			<Logo url={logo} name='Course logo' />
			<div className={styles.username}> {userName} </div>
			<Button
				onClick={handleButtonClick}
				label={isAuthorized ? 'Logout' : 'Login'}
			/>
		</div>
	);
};

export default Header;
