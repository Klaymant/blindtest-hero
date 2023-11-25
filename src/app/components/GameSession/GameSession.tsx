import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import TrackDisplay from "../TrackDisplay/TrackDisplay";
import { useTrackDisplay } from "../TrackDisplay/useTrackDisplay";
import { TracksProvider } from "@/app/contexts/TracksProvider";

function GameSession() {
  const { score, lives, soundOptions, setSoundOptions } = useBlindtestContext();
  const {
    tracks,
    chosenTrack,
    loading,
    audioPreview,
    regenerateTracks,
    mute,
    changeVolume,
  } = useTrackDisplay({ soundOptions, setSoundOptions });

  return (
    <>
      <TracksProvider
        tracks={tracks}
        chosenTrack={chosenTrack}
        loading={loading}
        audioPreview={audioPreview}
        regenerateTracks={regenerateTracks}
      >
        <section id="play-data">
          <p id="score">Score: <span>{score}</span></p>
          <p id="lives">Lives: <span>{lives}</span></p>
          <button onClick={mute}>{audioPreview?.muted ? 'Unmute' : 'Mute'}</button>
          <input type="range" min="0" max="100" step="1" value={(audioPreview?.volume || 0) * 100} onChange={changeVolume} />
        </section>
        <TrackDisplay />
      </TracksProvider>
    </>
  )
}

export { GameSession };
