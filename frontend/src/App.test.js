import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jira Export header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Jira Export/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders connection form initially', () => {
  render(<App />);
  const connectButton = screen.getByText(/Conectar/i);
  expect(connectButton).toBeInTheDocument();
});
