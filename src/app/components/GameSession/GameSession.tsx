import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { TrackSelection } from "../TrackSelection/TrackSelection";
import { useTrackDisplay } from "../TrackSelection/useTrackDisplay";
import { TracksProvider } from "@/app/contexts/TracksProvider";
import { AudioControls } from "./AudioControls";
import { useEffect } from "react";

function GameSession() {
  const { score, lives, soundOptions, setSoundOptions } = useBlindtestContext();
  const {
    roundTracks,
    chosenTrack,
    loading,
    audioPreview,
    regenerateTracks,
    mute,
    changeVolume,
    increaseVolume,
    decreaseVolume,
  } = useTrackDisplay({ soundOptions, setSoundOptions });

  useEffect(() => {
    document.addEventListener('keydown', handleEvent);

    function handleEvent(event: KeyboardEvent) {
      switch (event.key) {
        case 'm':
          mute();
          break;
        case 'ArrowRight':
          increaseVolume();
          break;
        case 'ArrowLeft':
          decreaseVolume();
          break;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEvent);
    };
  }, [mute]);

  return (
    <>
      <TracksProvider
        tracks={roundTracks}
        chosenTrack={chosenTrack}
        loading={loading}
        audioPreview={audioPreview}
        regenerateTracks={regenerateTracks}
      >
        <section id="play-data">
          <p id="score">Score: <span>{score}</span></p>
          <p id="lives">Lives: <span>{lives}</span></p>
          <AudioControls audioPreview={audioPreview} mute={mute} changeVolume={changeVolume} />
        </section>
        <TrackSelection />
      </TracksProvider>
    </>
  )
}

export { GameSession };
