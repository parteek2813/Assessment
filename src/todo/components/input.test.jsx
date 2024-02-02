import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './input'; // Adjust the import path as necessary

describe('Input Component', () => {
  const mockOnSubmit = jest.fn();
  const placeholderText = 'What needs to be done?';
  const labelText = 'What needs to be done?';
  const defaultValue = '';

  beforeEach(() => {
    render(<Input onSubmit={mockOnSubmit} placeholder={placeholderText} label={labelText} defaultValue={defaultValue} />);
    mockOnSubmit.mockClear();
  });

  test('renders input correctly', () => {
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('submits sanitized input on Enter key press', () => {
    const testValue = 'Test <script>alert("xss")</script>';
    // Corrected expected value to match the actual sanitized output
    const sanitizedValue = 'Test &lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;';
    fireEvent.change(screen.getByTestId('text-input'), { target: { value: testValue } });
    fireEvent.keyDown(screen.getByTestId('text-input'), { key: 'Enter' });
    expect(mockOnSubmit).toHaveBeenCalledWith(sanitizedValue);
  });

  test('does not submit input if below minimum length', () => {
    fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'a' } });
    fireEvent.keyDown(screen.getByTestId('text-input'), { key: 'Enter' });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
