'use client';
import { Track } from "@/app/types/Track";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { SyntheticEvent } from "react";
import { useTracksContext } from "@/app/contexts/TracksProvider";
import { TrackCard } from "./Track";

export function TrackSelection() {
  const { tracks, chosenTrack, loading, regenerateTracks } = useTracksContext();
  const { increaseScore, loseLife, setScreenSelection, lives } = useBlindtestContext();

  function guessTrack(e: SyntheticEvent, trackId: number) {
    if (trackId === chosenTrack?.id) {
      e.currentTarget.classList.add('success');
      increaseScore(100);
    } else if (lives > 1) {
      e.currentTarget.classList.add('fail');
      loseLife();
    } else {
      e.currentTarget.classList.add('fail');
      setScreenSelection('game-over');
    }

    setTimeout(() => {
      regenerateTracks();
    }, 1000);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && hasEmptyTracks(tracks) && <NoMoreTrack />}
      {!loading && !hasEmptyTracks(tracks) && <Tracks tracks={tracks} guessTrack={guessTrack} />}
    </>
  );
}

function Tracks({ tracks, guessTrack }: TracksProps) {
  return (
    <section className="track-display">
      {tracks.map((track) => <TrackCard key={track.id} track={track} guessTrack={guessTrack} />)}
    </section>
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