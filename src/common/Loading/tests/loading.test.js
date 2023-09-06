import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingComponent from '../Loading';

describe('LoadingComponent', () => {
	it('renders loading text', () => {
		render(<LoadingComponent />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders with the correct class', () => {
		const { container } = render(<LoadingComponent />);
		const loadingDiv = container.querySelector('.loading');

		expect(loadingDiv).toBeInTheDocument();
	});
});
