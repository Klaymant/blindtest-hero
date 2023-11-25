'use client';
import { Track } from "@/app/types/Track";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { SyntheticEvent } from "react";
import { useTracksContext } from "@/app/contexts/TracksProvider";

export default function TrackDisplay() {
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

  function getCoverAltText(track: Track): string {
    return `Cover of ${track.title} by ${track.artist.name}`;
  }

  function shortenTrackTitle(title: string): string {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }

  return (
    <section className="track-display">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {tracks.map((track) => (
          <button key={track.id} onClick={(e) => guessTrack(e, track.id)}>
            <img src={track.album.cover_medium} alt={getCoverAltText(track)} />
            <p>
              {shortenTrackTitle(track.title)}<br/>
              {track.artist.name}
            </p>
          </button>
          ))}
        </>
      )}
    </section>
  );
}
