import { Track } from "@/app/types/Track";
import { StringModifier } from "@/app/utils/StringModifier";
import { SyntheticEvent } from "react";

export function TrackCard({ track, guessTrack }: Props) {
  const coverAltText = `Cover of ${track.title} by ${track.artist.name}`;

  return (
    <button key={track.id} id={String(track.id)} onClick={(e) => guessTrack(e, track.id)}>
      <img src={track.album.cover_medium} alt={coverAltText} />
      <p>
        {StringModifier.shorten(track.title, 20)}<br/>
        {StringModifier.shorten(track.artist.name, 20)}
      </p>
    </button>
  );
}

type Props = {
  track: Track;
  guessTrack: (e: SyntheticEvent, trackId: number) => void;
};
