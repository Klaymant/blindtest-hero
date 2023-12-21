import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { TrackSelection } from "../TrackSelection/TrackSelection";
import { useTrackDisplay } from "../TrackSelection/useTrackDisplay";
import { TracksProvider } from "@/app/contexts/TracksProvider";
import { AudioControls } from "../AudioControls";
import { useGameSession } from "./GameSession.hooks";

function GameSession() {
  const { round, lives, soundOptions, setSoundOptions, setScreenSelection, loseLife } = useBlindtestContext();
  const {
    roundTracks,
    chosenTrack,
    loading,
    audioPreview,
    roundCounter,
    regenerateTracks,
    resetRoundCounter,
    mute,
    changeVolume,
    increaseVolume,
    decreaseVolume,
  } = useTrackDisplay({ soundOptions, lives, setSoundOptions, setScreenSelection, loseLife });
  useGameSession({ mute, increaseVolume, decreaseVolume });

  return (
    <>
      <TracksProvider
        tracks={roundTracks}
        chosenTrack={chosenTrack}
        loading={loading}
        audioPreview={audioPreview}
        roundCounter={roundCounter}
        regenerateTracks={regenerateTracks}
        resetRoundCounter={resetRoundCounter}
      >
        <section id="play-data">
          <AudioControls audioPreview={audioPreview} mute={mute} changeVolume={changeVolume} />
          <AudioPreviewCounter counter={roundCounter} />
          <p id="round">Round <span className="appear">{round}</span></p>
          <p id="lives">Lives: <span>{lives}</span></p>
        </section>
        <TrackSelection />
      </TracksProvider>
    </>
  )
}

function AudioPreviewCounter({ counter }: { counter: number }) {
  return (
    <p className="counter">
      <span className={`${counter > 0 && 'glow-up'}`}>{counter}</span>
    </p>
  );
}

export { GameSession };
