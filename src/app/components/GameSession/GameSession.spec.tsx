import { render, screen, waitFor } from '@testing-library/react';
import { Blindtest } from '../Blindtest/Blindtest';
import 'cross-fetch/polyfill';
import { Track } from '@/app/types/Track';

jest.mock('../../services/TrackApiFetcher.ts', () => ({
  TrackApiFetcher: () => ({
    getTrackFromChart: function(index: number): Promise<Response> {
      const track: Track = {
        id: index,
        title: 'title ' + index,
        artist: {
          name: 'artist',
        },
        album: {
          cover_medium: 'cover',
        }
      };
  
      return new Promise((resolve) => {
        const responseBody = JSON.stringify(track);
  
        const response = new Response(responseBody, {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-type': 'application/json'
          },
        });
  
        resolve(response);
      });
    },
  }),
}));

describe('Tests for initial game session screen', () => {
  it('should display a score of 0 and 5 lives', async () => {
    const { container } = render(<Blindtest />);

    await playGame();

    const score = getSelectorContent(container, '#score span');
    const nbLives = getSelectorContent(container, '#lives span');

    expect(score).toBe('0');
    expect(nbLives).toBe('5');
  });

  it('should show volume icon', async () => {
    render(<Blindtest />);

    await playGame();

    const volumeIcon = screen.getByAltText(/volume icon/);

    expect(volumeIcon).toBeDefined();
  });

  it('should display volume at 30%', async () => {
    render(<Blindtest />);

    await playGame();

    const volumeInput = await screen.findByRole('slider') as HTMLInputElement;

    expect(volumeInput).toBeDefined();
    expect(volumeInput.value).toBe('30');
  });
});

async function playGame() {
  return waitFor(function() {
    screen.getByText('Play').click();
  });
}

function getSelectorContent(container: HTMLElement, selector: string): string {
  return container.querySelector(selector)?.innerHTML || '';
}
