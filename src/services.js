import { API_URL } from './constants';

export const loginRequest = async (formData) => {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const registrationRequest = async (formData) => {
	try {
		const response = await fetch(`${API_URL}/register`, {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getCoursesList = async () => {
	try {
		const response = await fetch(`${API_URL}/courses/all`);
		const data = await response.json();
		return data.result;
	} catch (error) {
		console.log(error);
	}
};

export const deleteCourse = async (id) => {
	const requestOptions = {
		method: 'DELETE',
		headers: {
			authorization: localStorage.getItem('userToken'),
		},
	};
	try {
		const response = await fetch(`${API_URL}/courses/${id}`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createCourse = async (course) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('userToken'),
		},
		body: JSON.stringify(course),
	};
	try {
		const response = await fetch(`${API_URL}/courses/add`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getAuthorsList = async () => {
	try {
		const response = await fetch(`${API_URL}/authors/all`);
		const data = await response.json();
		return data.result;
	} catch (error) {
		console.log(error);
	}
};

export const createAuthor = async (author) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('userToken'),
		},
		body: JSON.stringify(author),
	};
	try {
		const response = await fetch(`${API_URL}/authors/add`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
