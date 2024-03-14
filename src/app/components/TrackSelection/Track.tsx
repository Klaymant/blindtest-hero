import { Track } from "@/app/types/Track";
import { StringModifier } from "@/app/utils/StringModifier";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

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
      <img
        srcSet={`${track.album.cover_medium} 250w`}
        sizes="(max-width: 500px) 80px, (max-width: 1000px) 150px, (max-width: 1300px) 200px, 250px"
        src={track.album.cover_big}
        alt={coverAltText}
      />
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
