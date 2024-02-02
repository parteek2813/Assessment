import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';
import { BrowserRouter as Router } from 'react-router-dom';

// Wrap App with a Router component
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('App', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    expect(getByPlaceholderText(/What needs to be done?/i)).toBeInTheDocument();
  });

  // Remove the duplicate test that does not use renderWithRouter

 
  it('allows users to complete tasks', () => {
    const { getByLabelText } = renderWithRouter(<App />);
    // Adjust how you simulate the completion of tasks based on your actual implementation
  });



  it('updates items left count when tasks are completed', () => {
    const { getByLabelText } = renderWithRouter(<App />);
    // Adjust how you simulate the completion of tasks and check the items left count
  });

});
