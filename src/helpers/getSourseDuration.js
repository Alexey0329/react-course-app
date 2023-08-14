export const formatTime = (minutes) => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	let formattedTime = '';

	if (hours === 1) {
		formattedTime += '01';
	} else if (hours < 10) {
		formattedTime += '0' + hours;
	} else {
		formattedTime += hours;
	}

	if (mins < 10) {
		formattedTime += ':0' + mins;
	} else {
		formattedTime += ':' + mins;
	}

	if (hours === 1) {
		formattedTime += ' hour';
	} else {
		formattedTime += ' hours';
	}

	return formattedTime;
};
