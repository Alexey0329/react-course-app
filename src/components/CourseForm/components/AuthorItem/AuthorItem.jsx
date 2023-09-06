import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';
import trash from '../../../../assets/trashSmall.svg';
import add from '../../../../assets/addSmall.svg';

import styles from './AuthorItem.module.css';

const AuthorItem = (props) => {
	return (
		<div className={styles.authorItem}>
			<div className={styles.authorName}>{props.name}</div>
			<Button data-testid='addButton' onClick={props.onAdd} imagePath={add} />
			<Button
				data-testid='removeButton'
				onClick={props.onRemove}
				imagePath={trash}
			/>
		</div>
	);
};

AuthorItem.propTypes = {
	name: PropTypes.string,
	onRemove: PropTypes.func,
	onAdd: PropTypes.func,
};

export default AuthorItem;
