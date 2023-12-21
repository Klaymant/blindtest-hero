import { Track } from "@/app/types/Track";
import { StringModifier } from "@/app/utils/StringModifier";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

export function TrackCard({ track, isTrackChosen, guessTrack, setIsTrackChosen }: Props) {
  const coverAltText = `Cover of ${track.title} by ${track.artist.name}`;

  function handleGuessTrack(e: SyntheticEvent<Element, Event>) {
    if (!isTrackChosen) {
      guessTrack(e, track.id);
      setIsTrackChosen(true);
    }
  }

  return (
    <button key={track.id} id={String(track.id)} onClick={handleGuessTrack}>
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
  isTrackChosen: boolean;
  guessTrack: (e: SyntheticEvent, trackId: number) => void;
  setIsTrackChosen: Dispatch<SetStateAction<boolean>>;
};
