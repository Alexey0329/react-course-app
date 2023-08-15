import Button from '../../../../common/Button/Button';
import { SEARCH_LABEL } from '../../../../constants';
const SearchBar = () => {
	return (
		<div className='search-bar'>
			<input className='search-input'></input>
			<Button label={SEARCH_LABEL} onClick={console.log} />
		</div>
	);
};

export default SearchBar;
