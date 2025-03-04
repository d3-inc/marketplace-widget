// import { render, screen } from '@testing-library/react';
// import Hello from '../../src/components/Hello';

// test('renders Hello component', async () => {
//   render(<Hello />);
//   expect(await screen.findByText(/hello, world/i));
// });

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hello from '../../src/components/Hello';

test('renders Hello component', async () => {
  render(<Hello />);
  expect(await screen.findByText(/hello, world/i)).toBeInTheDocument();
});

// simple jest test
// export const hello = () => 'Hello, World!';
// test('returns Hello, World!', () => {
//   expect(hello()).toBe('Hello, World!');
// });
