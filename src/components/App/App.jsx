import React from 'react';

import Header from '../Header/Header';

const App = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default App;
