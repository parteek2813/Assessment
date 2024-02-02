import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './footer';

// Mock dispatch function
const mockDispatch = jest.fn();

describe('Footer', () => {
    it('should not render when there are no todos', () => {
        const { queryByTestId } = render(<Router><Footer todos={[]} dispatch={mockDispatch} /></Router>);
        expect(queryByTestId('footer')).toBeNull();
    });

    it('should display the correct item count for active todos', () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: true },
            { id: 3, completed: false },
        ];
        const { getByText } = render(<Router><Footer todos={todos} dispatch={mockDispatch} /></Router>);
        expect(getByText('2 items left!')).toBeInTheDocument();
    });

    it('should correctly highlight the "All" filter when on the root path', () => {
        // Use 'MemoryRouter' to set initial route for test
        const { getByText } = render(<Router initialEntries={['/']}><Footer todos={[{ id: 1, completed: false }]} dispatch={mockDispatch} /></Router>);
        expect(getByText('All').className).toContain('selected');
    });

    it('should disable the clear completed button when there are no completed todos', () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: false },
        ];
        const { getByText } = render(<Router><Footer todos={todos} dispatch={mockDispatch} /></Router>);
        expect(getByText('Clear completed').disabled).toBeTruthy();
    });

    it('should call dispatch when the clear completed button is clicked', () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: true },
        ];
        const { getByText } = render(<Router><Footer todos={todos} dispatch={mockDispatch} /></Router>);
        fireEvent.click(getByText('Clear completed'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
    });
});
