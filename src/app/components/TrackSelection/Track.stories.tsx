import type { Meta, StoryObj } from '@storybook/react';
import { TrackCard } from './Track';
import './TrackSelection.css';

const meta: Meta<typeof TrackCard> = {
  component: TrackCard,
};

export const Primary: Story = {
  args: {
    track: {
      id: 1,
      title: 'Track Title',
      artist: {
        name: 'Artist Name',
      },
      album: {
        cover_small: 'https://e-cdns-images.dzcdn.net/images/cover/cccbb5f1b4a1ec197aa15d9b4d47ef60/56x56-000000-80-0-0.jpg',
        cover_medium: 'https://e-cdns-images.dzcdn.net/images/cover/cccbb5f1b4a1ec197aa15d9b4d47ef60/250x250-000000-80-0-0.jpg',
        cover_big: 'https://e-cdns-images.dzcdn.net/images/cover/cccbb5f1b4a1ec197aa15d9b4d47ef60/500x500-000000-80-0-0.jpg',
      },
      preview: 'preview',
    },
    isTrackChosen: false,
    setIsTrackChosen: () => {},
    guessTrack: () => {},
  },
  argTypes: {
    isTrackChosen: { table: { disable: true }},
    setIsTrackChosen: { table: { disable: true }},
    guessTrack: { table: { disable: true }},
  },
  render: ({ ...args }) => (
    <section className='track-display'>
      <TrackCard {...args} />
    </section>
  ),
};

type Story = StoryObj<typeof TrackCard>;

export default meta;