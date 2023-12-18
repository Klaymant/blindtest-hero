'use client';
import { Track } from "@/app/types/Track";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { SyntheticEvent } from "react";
import { useTracksContext } from "@/app/contexts/TracksProvider";
import { TrackCard } from "./Track";
import { GAME_CONFIG } from "@/app/config";

export function TrackSelection() {
  const {
    tracks,
    chosenTrack,
    audioPreview,
    loading,
    regenerateTracks,
    resetCurrentAudioPreviewTime,
  } = useTracksContext();
  const { lives, increaseScore, loseLife, setScreenSelection } = useBlindtestContext();

  function guessTrack(e: SyntheticEvent, trackId: number) {
    let currentLives = lives;

    if (trackId === chosenTrack?.id) {
      e.currentTarget.classList.add('success');
      increaseScore(100);
    } else {
      const chosenTrackElement = document.getElementById(String(chosenTrack?.id));

      e.currentTarget.classList.add('fail');
      chosenTrackElement?.classList.add('real-track');
      loseLife();
      currentLives--;
    }

    setTimeout(() => {
      if (currentLives > 0) {
        resetCurrentAudioPreviewTime();
        regenerateTracks();
      } else
        setScreenSelection('game-over');
    }, GAME_CONFIG.timeBeforeNextRoundInMs);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && hasEmptyTracks(tracks) && <NoMoreTrack />}
      {!loading && !hasEmptyTracks(tracks) && (
        <>
          <AudioPreviewCounter currentTime={audioPreview?.currentTime || 0} />
          <Tracks tracks={tracks} guessTrack={guessTrack} />
        </>
      )}
    </>
  );
}

function Tracks({ tracks, guessTrack }: TracksProps) {
  return (
    <>
      <section className="track-display">
        {tracks.map((track) => <TrackCard key={track.id} track={track} guessTrack={guessTrack} />)}
      </section>
    </>
  );
}

function AudioPreviewCounter({ currentTime }: { currentTime: number }) {
  const counter = currentTime > 30 ? 0 : Math.floor(30 - currentTime);

  return (
    <p className="counter">
      <span className={`${counter > 0 && 'glow-up'}`}>{counter}</span>
    </p>
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
  guessTrack: (e: SyntheticEvent, trackId: number) => void;
};