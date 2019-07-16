/* eslint-env jest */

import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Text from '../Text';

afterEach(cleanup);

const component = (props) => (
  <Text
    prefixClassName="test"
    {...props}
  />
);

test('Smoke', async () => {
  const { getByTestId } = render(component());
  expect(getByTestId('text')).toBeInTheDocument();
});

test('Custom Class', async () => {
  const { getByTestId } = render(component({ className: 'test' }));
  expect(getByTestId('text')).toHaveClass('test');
});

test('Label', async () => {
  const { container } = render(component({ label: 'label' }));
  expect(container.getElementsByClassName('test-label').length).toBe(1);
});

test('Error', async () => {
  const { container } = render(component({ error: 'error' }));
  expect(container.getElementsByClassName('error').length).toBe(1);
});

test('Disabled', async () => {
  const { container } = render(component({ disabled: true }));
  expect(container.getElementsByClassName('disabled').length).toBe(1);
});
