import React from 'react';

const Logo = (props) => {
	return <img className='logo' src={props.url} alt={props.name} />;
};

export default Logo;
