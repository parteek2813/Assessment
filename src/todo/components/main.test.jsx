import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Main } from './main';

// Mock dispatch function
const mockDispatch = jest.fn();

// Mock the Item component if necessary or make sure it renders the text content and other props correctly
jest.mock('./Item', () => {
  // Mock Item component with a button that toggles completion
  return {
    Item: ({ todo, dispatch }) => (
      <li data-testid={`todo-item-${todo.id}`}>
        <input
          type="checkbox"
          data-testid={`todo-item-toggle-${todo.id}`}
          checked={todo.completed}
          readOnly
        />
        <label data-testid={`todo-item-label-${todo.id}`}>
          {todo.text}
        </label>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
          data-testid={`todo-item-button-${todo.id}`}
        >
          Delete
        </button>
      </li>
    ),
  };
});

describe('Main', () => {
  const todos = [
    { id: 1, text: 'Task1', completed: false },
    { id: 2, text: 'Task2', completed: false },
    { id: 3, text: 'Task3', completed: true },
  ];

  const renderWithRoute = (route) =>
    render(
      <MemoryRouter initialEntries={[route]}>
        <Main todos={todos} dispatch={mockDispatch} />
      </MemoryRouter>
    );

    it('should check "Toggle All" if all todos are completed', () => {
        const allCompletedTodos = todos.map(todo => ({ ...todo, completed: true }));
        const { getByTestId } = render(
            <MemoryRouter>
                <Main todos={allCompletedTodos} dispatch={mockDispatch} />
            </MemoryRouter>
        );
        expect(getByTestId('toggle-all').checked).toBe(true);
    });

    it('should not check "Toggle All" if some todos are active', () => {
        const { getByTestId } = renderWithRoute('/');
        expect(getByTestId('toggle-all').checked).toBe(false);
    });

    it('should call dispatch with "TOGGLE_ALL" when "Toggle All" is clicked', () => {
        const { getByTestId } = renderWithRoute('/');
        fireEvent.click(getByTestId('toggle-all'));
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'TOGGLE_ALL' }));
    });
  // Verifying the correct props passed to each Item component
  it('should pass correct props to Item components', () => {
    const { getByTestId } = renderWithRoute('/');
    todos.forEach((todo) => {
      const itemLabel = getByTestId(`todo-item-label-${todo.id}`);
      expect(itemLabel).toHaveTextContent(todo.text);
    });
  });



});
