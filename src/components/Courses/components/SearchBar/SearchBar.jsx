import Button from '../../../../common/Button/Button';
const SearchBar = () => {
	return (
		<div className='search-bar'>
			<input className='search-input'></input>
			<Button label='Search' onClick={console.log} />
		</div>
	);
};

export default SearchBar;
