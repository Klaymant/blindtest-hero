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
        },
        preview: 'preview',
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
    getTracksFromChart: function(): Promise<Response> {
      const tracks: Track[] = [
        {
          id: 1,
          title: 'title 1',
          artist: {
            name: 'artist',
          },
          album: {
            cover_medium: 'cover',
          },
          preview: 'preview',
        },
        {
          id: 2,
          title: 'title 2',
          artist: {
            name: 'artist',
          },
          album: {
            cover_medium: 'cover',
          },
          preview: 'preview',
        },
        {
          id: 3,
          title: 'title 3',
          artist: {
            name: 'artist',
          },
          album: {
            cover_medium: 'cover',
          },
          preview: 'preview',
        },
        {
          id: 4,
          title: 'title 4',
          artist: {
            name: 'artist',
          },
          album: {
            cover_medium: 'cover',
          },
          preview: 'preview',
        },
      ];
  
      return new Promise((resolve) => {
        const responseBody = JSON.stringify(tracks);
  
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

    const round = getSelectorContent(container, '#round span');
    const nbLives = getSelectorContent(container, '#lives span');

    expect(round).toBe('1');
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
