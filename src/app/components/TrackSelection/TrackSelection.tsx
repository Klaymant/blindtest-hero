'use client';
import { Track } from "@/app/types/Track";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { useTracksContext } from "@/app/contexts/TracksProvider";
import { TrackCard } from "./Track";
import { GAME_CONFIG } from "@/app/config";

export function TrackSelection() {
  const {
    chosenTrack,
    isTrackChosen,
    loading,
    tracks,
    regenerateTracks,
    resetRoundCounter,
    setIsTrackChosen,
  } = useTracksContext();
  const { lives, increaseRound, loseLife, setScreenSelection } = useBlindtestContext();

  function guessTrack(e: SyntheticEvent, trackId: number) {
    let currentLives = lives;

    if (trackId === chosenTrack?.id) {
      e.currentTarget.classList.add('success');
      increaseRound(1);
    } else {
      const chosenTrackElement = document.getElementById(String(chosenTrack?.id));

      e.currentTarget.classList.add('fail');
      chosenTrackElement?.classList.add('real-track');
      loseLife();
      currentLives--;
    }

    setTimeout(() => {
      if (currentLives > 0) {
        resetRoundCounter();
        regenerateTracks();
        setIsTrackChosen(false);
      } else
        setScreenSelection('game-over');
    }, GAME_CONFIG.timeBeforeNextRoundInMs);
  }

  return (
    <>
      {loading && <p className="text-center">Loading...</p>}
      {!loading && hasEmptyTracks(tracks) && <NoMoreTrack />}
      {!loading && !hasEmptyTracks(tracks) && (
        <>
          <Tracks tracks={tracks} isTrackChosen={isTrackChosen} guessTrack={guessTrack} setIsTrackChosen={setIsTrackChosen} />
        </>
      )}
    </>
  );
}

function Tracks({ tracks, isTrackChosen, guessTrack, setIsTrackChosen }: TracksProps) {
  return (
    <>
      <section className="track-display">
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