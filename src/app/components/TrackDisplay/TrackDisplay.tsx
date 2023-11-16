'use client';
import { Track } from "@/app/types/Track";
import { useTrackDisplay } from "./useTrackDisplay";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";

export default function TrackDisplay() {
  const { tracks, chosenTrack, regenerateTracks } = useTrackDisplay();
  const { increaseScore, loseLife, setScreenSelection, lives } = useBlindtestContext();

  function guessTrack(trackId: number) {
    return function() {
      if (trackId === chosenTrack?.id)
        increaseScore(100);
      else if (lives > 1)
        loseLife();
      else
        setScreenSelection('game-over');
      regenerateTracks();
    }
  }

  function getCoverAltText(track: Track): string {
    return `Cover of ${track.title} by ${track.artist.name}`;
  }

  function shortenTrackTitle(title: string): string {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }

  return (
    <section className="track-display">
      {tracks.map((track) => (
        <button key={track.id} onClick={guessTrack(track.id)}>
          <img src={track.album.cover_medium} alt={getCoverAltText(track)} />
          <p>
            {shortenTrackTitle(track.title)}<br/>
            {track.artist.name}
          </p>
        </button>
      ))}
    </section>
  );
}
