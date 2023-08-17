import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
	return <img className='logo' src={props.url} alt={props.name} />;
};

Logo.propTypes = {
	url: PropTypes.string,
	name: PropTypes.string,
};

export default Logo;
