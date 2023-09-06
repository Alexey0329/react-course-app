import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthorItem from '../AuthorItem';

describe('AuthorItem Component', () => {
	it('renders the author name and buttons correctly', () => {
		const name = 'John Doe';
		render(<AuthorItem name={name} />);

		const authorName = screen.getByText(name);
		expect(authorName).toBeInTheDocument();

		const addBtn = screen.getByTestId('addButton');
		expect(addBtn).toBeInTheDocument();

		const removeBtn = screen.getByTestId('removeButton');
		expect(removeBtn).toBeInTheDocument();
	});

	it('calls onAdd when add button is clicked', () => {
		const onAddMock = jest.fn();
		render(<AuthorItem name='John Doe' onAdd={onAddMock} />);

		const addBtn = screen.getByTestId('addButton');
		fireEvent.click(addBtn);

		expect(onAddMock).toHaveBeenCalledTimes(1);
	});

	it('calls onRemove when remove button is clicked', () => {
		const onRemoveMock = jest.fn();
		render(<AuthorItem name='John Doe' onRemove={onRemoveMock} />);

		const removeBtn = screen.getByTestId('removeButton');
		fireEvent.click(removeBtn);

		expect(onRemoveMock).toHaveBeenCalledTimes(1);
	});
});
