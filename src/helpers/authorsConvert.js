export const getAuthorsNameList = (authorsIds, authorsList) => {
	return (
		authorsIds?.map((id) => {
			return (
				authorsList?.find((author) => id === author.id)?.name ||
				'Unknown Author'
			);
		}) || []
	);
};
