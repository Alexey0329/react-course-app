import React from 'react';
import Button from '../../../../common/Button/Button';
import trash from '../../../../assets/trashSmall.svg';
import add from '../../../../assets/addSmall.svg';
import './AuthorItem.css';
import { mockedAuthorsList } from '../../../../constants';
import PropTypes from 'prop-types';

const AuthorItem = (props) => {
	return (
		<div className='author-item'>
			<div className='author-name'>{props.name}</div>
			<Button onClick={props.onAdd} imagePath={add} />
			<Button onClick={props.onRemove} imagePath={trash} />
		</div>
	);
};

AuthorItem.propTypes = {
	name: PropTypes.string,
	onRemove: PropTypes.func,
	onAdd: PropTypes.func,
};

export default AuthorItem;
