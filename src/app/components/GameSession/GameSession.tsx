import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { TrackDisplay } from "../TrackDisplay/TrackDisplay";
import { useTrackDisplay } from "../TrackDisplay/useTrackDisplay";
import { TracksProvider } from "@/app/contexts/TracksProvider";
import Image, { StaticImageData } from "next/image";
import volumeIcon from '../../../../public/volume.png';
import muteIcon from '../../../../public/mute.png';

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
                VolumeIcon(muteIcon, 'mute icon') :
                VolumeIcon(volumeIcon, 'volume icon')
              }
            </button>
            <input type="range" min="0" max="100" step="1" value={(audioPreview?.volume || 0) * 100} onChange={changeVolume} />
          </section>
        </section>
        <TrackDisplay />
      </TracksProvider>
    </>
  )
}

function VolumeIcon(src: StaticImageData, alt: string) {
  return <Image src={src} width={12} height={12} alt={alt} />;
}

export { GameSession };
