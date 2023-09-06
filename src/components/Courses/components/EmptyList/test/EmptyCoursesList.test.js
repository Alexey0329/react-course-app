import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EmptyCoursesList from '../EmptyCoursesList';

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('EmptyCoursesList component', () => {
	it('renders with "Add New Course" button', () => {
		useSelector.mockReturnValue({ role: 'admin' });
		useNavigate.mockReturnValue(jest.fn());

		const { getByText } = render(<EmptyCoursesList />);
		expect(getByText('Your List Is Empty')).toBeInTheDocument();
		expect(
			getByText("Please use 'Add New Course' button to add new course")
		).toBeInTheDocument();
		expect(getByText('Add new course')).toBeInTheDocument();
	});

	it('navigates to /courses/add when "Add New Course" button is clicked', () => {
		useSelector.mockReturnValue({ role: 'admin' });
		const navigate = jest.fn();
		useNavigate.mockReturnValue(navigate);
		const { getByText } = render(<EmptyCoursesList />);
		const addButton = getByText('Add new course');

		fireEvent.click(addButton);

		expect(navigate).toHaveBeenCalledWith('/courses/add');
	});
});
