import type { Meta, StoryObj } from '@storybook/react';
import { TrackCard } from './Track';
import './TrackSelection.css';
import { StorybookHelper } from '@/app/utils/StorybookHelper';
import { Props } from '@/app/types/Props';

export const Primary: Story = {
  args: getBaseArgs(),
  argTypes: getBaseArgTypes(),
  render: ({ ...args }) => (
    <section className='track-display'>
      <TrackCard {...args} />
    </section>
  ),
};

export const RightChoice: Story = {
  args: getBaseArgs(),
  argTypes: getBaseArgTypes(),
  render: ({ ...args }) => (
    <section className='track-display success'>
      <TrackCard {...args} />
    </section>
  ),
};

export const WrongChoice: Story = {
  args: getBaseArgs(),
  argTypes: getBaseArgTypes(),
  render: ({ ...args }) => (
    <section className='track-display fail'>
      <TrackCard {...args} />
    </section>
  ),
};

export const RealTrack: Story = {
  args: getBaseArgs(),
  argTypes: getBaseArgTypes(),
  render: ({ ...args }) => (
    <section className='track-display real-track'>
      <TrackCard {...args} />
    </section>
  ),
};

function getBaseArgs() {
  return {
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
  };
};

function getBaseArgTypes() {
  return StorybookHelper.deactivateProps<Props<typeof TrackCard>>('isTrackChosen', 'setIsTrackChosen', 'guessTrack');
}

const meta: Meta<typeof TrackCard> = {
  component: TrackCard,
};

type Story = StoryObj<typeof TrackCard>;

export default meta;