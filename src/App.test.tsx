import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

describe("Buttons Colors Project", () => {
  test("Button has correct initial color", () => {
    render(<App />);

    const colorButton = screen.getAllByRole<HTMLButtonElement>("button", { name: "Change to Midnight Blue" })[ 0 ];

    expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
  });


  test('initial conditions', () => {
    render(<App />);

    const colorButton = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });
    expect(colorButton).toBeEnabled();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });


  test('Checkbox disables button on first click and enables on second click', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });

    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();

    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
  });

  test('Disabled button has gray background and reverts to red', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: gray');

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: MediumVioletRed');
  });

  test('Clicked disabled button has gray background and reverts to blue', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
    const colorButton = screen.getByRole('button', {
      name: 'Change to Midnight Blue',
    });

    fireEvent.click(colorButton);

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: gray');

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle('background-color: MidnightBlue');
  });


  describe('spaces before camel-case capital letters', () => {
    test('Works for no inner capital letters', () => {
      expect(replaceCamelWithSpaces('Red')).toBe('Red');
    });
    test('Works for one inner capital letter', () => {
      expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
    });
    test('Works for multiple inner capital letters', () => {
      expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
    });
  });


});
