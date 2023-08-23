import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
	return (
		<React.Fragment>
			<label>{props.label}:</label>
			<input
				type={props.type}
				id={props.id}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			></input>
			<div className='error'>{props.error}</div>
		</React.Fragment>
	);
};

Input.propTypes = {
	label: PropTypes.string,
	imagePath: PropTypes.string,
	onClick: PropTypes.func,
};

export default Input;
