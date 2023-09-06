import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => {
	return (
		<button
			data-testid={props['data-testid']}
			onClick={props.onClick}
			className={styles.button}
		>
			{!props.imagePath && props.label}
			{props.imagePath && <img src={props.imagePath} alt={props.label} />}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string,
	imagePath: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
