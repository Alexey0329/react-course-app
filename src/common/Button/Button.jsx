import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, label, imagePath }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			{!imagePath && label}
			{imagePath && <img src={imagePath} alt={label} />}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string,
	imagePath: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
