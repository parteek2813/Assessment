import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Header } from './header';

// ... (import statements)

describe('Header', () => {
    it('renders with correct structure and content', () => {
        const mockDispatch = jest.fn();
        render(<Header dispatch={mockDispatch} />);

        const header = screen.getByTestId('header');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('header');

        expect(screen.getByText('todos')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    });

    it('dispatches an ADD_ITEM action with the correct payload when a new todo is added', async () => {
        const mockDispatch = jest.fn();
        render(<Header dispatch={mockDispatch} />);
        const input = screen.getByPlaceholderText('What needs to be done?');

        await userEvent.type(input, 'New Todo{enter}');

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'ADD_ITEM',
            payload: { title: 'New Todo' },
        });
    });

    it('clears the input after adding a new todo', async () => {
        const mockDispatch = jest.fn();
        render(<Header dispatch={mockDispatch} />);
        const input = screen.getByPlaceholderText('What needs to be done?');

        await userEvent.type(input, 'New Todo{enter}');

        expect(input).toHaveValue('');
    });
});
