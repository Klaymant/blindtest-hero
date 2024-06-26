'use client';

import { Track } from "@/app/types/Track";
import { CSSProperties, Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";
import { TrackCard } from "./Track";
import './TrackSelection.css';
import { useAnimate } from "@/app/hooks/useAnimate";
import { RoundBreak } from "../RoundBreak/RoundBreak";
import { useTrackSelection } from "./TrackSelection.hook";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";

export function TrackSelection() {
  const {
    isTrackChosen,
    lives,
    loading,
    round,
    showRoundBreak,
    tracks,
    guessTrack,
    setIsTrackChosen,
  } = useTrackSelection();
  const { score } = useBlindtestContext();

  return (
    <>
      {loading && <p className="text-center">Loading...</p>}
      {!loading && hasEmptyTracks(tracks) && <NoMoreTrack />}
      {!loading && !hasEmptyTracks(tracks) && (
        <>
          <Tracks tracks={tracks} isTrackChosen={isTrackChosen} guessTrack={guessTrack} setIsTrackChosen={setIsTrackChosen} />
          {showRoundBreak && <RoundBreak round={round} lives={lives} score={score} />}
        </>
      )}
    </>
  );
}

function Tracks({ tracks, isTrackChosen, guessTrack, setIsTrackChosen }: TracksProps) {
  const [sectionRef, appearanceCallback] = useAnimate('appear');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(appearanceCallback, [tracks]);

  return (
    <>
      <section ref={sectionRef} className="track-display" style={{ '--delay': '0.5s' } as CSSProperties }>
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isTrackChosen={isTrackChosen}
            guessTrack={guessTrack}
            setIsTrackChosen={setIsTrackChosen}
          />
        ))}
      </section>
    </>
  );
}

function NoMoreTrack() {
  return (
    <>
      <h2>Music is over</h2>
      <p>
        Oops! It seems no more song is available.
      </p>
    </>
  );
}

function hasEmptyTracks(tracks: Track[]): boolean {
  return !tracks.every(Boolean);
}

type TracksProps = {
  tracks: Track[];
  isTrackChosen: boolean;
  guessTrack: (e: SyntheticEvent, trackId: number) => void;
  setIsTrackChosen: Dispatch<SetStateAction<boolean>>;
};
