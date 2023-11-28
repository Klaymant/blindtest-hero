import { render, screen } from '@testing-library/react';
import Home from "./page";

it('should display play button on landing', () => {
  render(<Home />);

  expect(screen.getByRole('heading', { name: /Blindtest Hero/, level: 1 })).toBeDefined();
});