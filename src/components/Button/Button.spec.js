import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders Button correctly', () => {
    render(<Button />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('renders Button with correct children', () => {
    render(<Button>test text</Button>);
    expect(screen.getByTestId('button')).toHaveTextContent('test text');
  });

  it('renders Button and triggers onClick handler', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    const buttonEl = screen.getByTestId('button');
    await userEvent.click(buttonEl);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
