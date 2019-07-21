/* eslint-env jest */

import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { ICON_MAP } from '../utils/getIcon';
import Icon from '../Icon';

afterEach(cleanup);

test('Smoke', async () => {
  const { queryAllByTestId, rerender, container } = render(<Icon />);
  expect(queryAllByTestId('icon').length).toBe(0)

  Object.keys(ICON_MAP).forEach((key) => {
    rerender(<Icon src={key} />);
    expect(queryAllByTestId('icon').length).toBe(1);
    expect(container.getElementsByTagName('svg').length).toBe(1);
  });
});

test('Size variations', async () => {
  const { getByTestId, rerender } = render(<Icon />);
  Object.keys(Icon.SIZES).forEach((type) => {
    rerender(<Icon src="info" size={Icon.SIZES[type]} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  // invalid size
  rerender(<Icon src="info" size="123" />);
  expect(getByTestId('icon')).toBeInTheDocument();
});

test('Custom class', async () => {
  const { getByTestId } = render(<Icon src="info" className="test" />);
  expect(getByTestId('icon')).toHaveClass('test');
});

test('Click', async () => {
  const mockOnClick = jest.fn();
  const { getByTestId } = render(<Icon src="info" onClick={mockOnClick} />);
  fireEvent.click(getByTestId('icon'));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test('Ref', async () => {
  const mockRef = jest.fn();
  const { getByTestId } = render(<Icon src="info" innerRef={mockRef} />);
  fireEvent.click(getByTestId('icon'));
  expect(mockRef).toHaveBeenCalledTimes(1);
});
