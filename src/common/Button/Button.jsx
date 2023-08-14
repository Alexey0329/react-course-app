import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, label, imagePath }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			{!imagePath && label}
			{imagePath && <img src={imagePath} alt={label} />}
		</button>
	);
};

export default Button;
