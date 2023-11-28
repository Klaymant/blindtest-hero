import { Blindtest } from "./Blindtest";
import { render, screen } from '@testing-library/react';

it('should display play button on landing', () => {
  render(<Blindtest />);

  expect(screen.getByRole('button', { name: /Play/i })).toBeDefined();
});
