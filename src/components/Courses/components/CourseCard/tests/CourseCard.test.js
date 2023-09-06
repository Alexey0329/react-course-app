import React from 'react';
import { render } from '@testing-library/react';
import CourseCard from '../CourseCard';

const testCourse = {
	title: 'Course Title',
	description: 'Course Description',
	duration: 120,
	authors: ['Author'],
	creationDate: '9/3/2021',
};

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
	useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('CourseCard', () => {
	it('should display the title', () => {
		const { getByText } = render(<CourseCard {...testCourse} />);
		const titleElement = getByText(testCourse.title);
		expect(titleElement).toBeInTheDocument();
	});

	it('should display the description', () => {
		const { getByText } = render(<CourseCard {...testCourse} />);
		const descriptionElement = getByText(testCourse.description);
		expect(descriptionElement).toBeInTheDocument();
	});

	it('should display the duration in the correct format', () => {
		const { getByText } = render(<CourseCard {...testCourse} />);
		const durationElement = getByText('02:00 hours');
		expect(durationElement).toBeInTheDocument();
	});

	it('should display the authors list', () => {
		const { getByText } = render(<CourseCard {...testCourse} />);
		const authorsElement = getByText('Author');
		expect(authorsElement).toBeInTheDocument();
	});

	it('should display the created date in the correct format', () => {
		const { getByText } = render(<CourseCard {...testCourse} />);
		const createdDateElement = getByText('9.3.2021');
		expect(createdDateElement).toBeInTheDocument();
	});
});
