import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Item } from './item'; // Adjust the import path as necessary

describe('Item Component', () => {
  test('renders todo item correctly', () => {
    const mockTodo = {
      id: 1,
      title: 'Test Todo',
      completed: false,
    };
    const mockDispatch = jest.fn();

    render(<Item todo={mockTodo} dispatch={mockDispatch} index={0} />);

    // Check if the todo item's title is rendered
    expect(screen.getByTestId('todo-item-label-0')).toHaveTextContent('Test Todo');

    // Check if the toggle checkbox is rendered and not checked
    expect(screen.getByTestId('todo-item-toggle-0')).not.toBeChecked();
  });
});
