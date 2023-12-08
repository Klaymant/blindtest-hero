import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { TrackSelection } from "../TrackSelection/TrackSelection";
import { useTrackDisplay } from "../TrackSelection/useTrackDisplay";
import { TracksProvider } from "@/app/contexts/TracksProvider";
import volumeIcon from '../../../../public/volume.png';
import muteIcon from '../../../../public/mute.png';
import { VolumeIcon } from "./VolumeIcon";

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
  } = useTrackDisplay({ soundOptions, setSoundOptions });

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
          <section id="audio-controls">
            <button
              type="button"
              className="option"
              onClick={mute}
            >
              {audioPreview?.muted ?
                <VolumeIcon src={muteIcon} alt="mute icon" /> :
                <VolumeIcon src={volumeIcon} alt="volume icon" />
              }
            </button>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={(audioPreview?.volume || 0) * 100}
              onChange={changeVolume}
            />
          </section>
        </section>
        <TrackSelection />
      </TracksProvider>
    </>
  )
}

export { GameSession };
