import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';

describe('Button component', () => {
	it('renders the Button component with label', () => {
		const testProps = {
			label: 'Click me',
			onClick: jest.fn(),
		};

		const { getByText } = render(<Button {...testProps} />);
		const buttonElement = getByText(testProps.label);
		expect(buttonElement).toBeInTheDocument();
		fireEvent.click(buttonElement);
		expect(testProps.onClick).toHaveBeenCalledTimes(1);
	});

	it('renders the Button component with an image', () => {
		const testProps = {
			imagePath: 'test-image.png',
			label: 'Image Button',
		};
		const { getByRole } = render(<Button {...testProps} />);
		const imgElement = getByRole('img');
		expect(imgElement).toBeInTheDocument();
	});
});
