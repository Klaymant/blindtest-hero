import { Track } from "@/app/types/Track";
import { SyntheticEvent } from "react";

export function TrackCard({ track, guessTrack }: Props) {
  return (
    <button key={track.id} onClick={(e) => guessTrack(e, track.id)}>
      <img src={track.album.cover_medium} alt={getCoverAltText(track)} />
      <p>
        {shortenTrackTitle(track.title)}<br/>
        {track.artist.name}
      </p>
    </button>
  );
}

function getCoverAltText(track: Track): string {
  return `Cover of ${track.title} by ${track.artist.name}`;
}

function shortenTrackTitle(title: string): string {
  return title.length > 20 ? title.substring(0, 20) + '...' : title;
}

type Props = {
  track: Track;
  guessTrack: (e: SyntheticEvent, trackId: number) => void;
};
