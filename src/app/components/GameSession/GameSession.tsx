import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { TrackSelection } from "../TrackSelection/TrackSelection";
import { useTrackDisplay } from "../../hooks/useTrackDisplay";
import { TracksProvider } from "@/app/contexts/TracksProvider";
import { AudioControls } from "../AudioControls/AudioControls";
import { useGameSession } from "./GameSession.hooks";
import Image from "next/image";
import hourglassIcon from '../../../../public/hourglass.png';
import heartIcon from '../../../../public/heart.png';
import './GameSession.css';
import { ScoreCounter } from "../ScoreCounter/ScoreCounter";

function GameSession() {
  const { round, lives, soundOptions, score, setSoundOptions, setScreenSelection, loseLife } = useBlindtestContext();
  const {
    audioPreview,
    chosenTrack,
    isTrackChosen,
    loading,
    roundCounter,
    roundTracks,
    changeVolume,
    decreaseVolume,
    increaseVolume,
    mute,
    regenerateTracks,
    resetRoundCounter,
    setIsTrackChosen,
  } = useTrackDisplay({ soundOptions, lives, setSoundOptions, setScreenSelection, loseLife });
  useGameSession({ mute, increaseVolume, decreaseVolume });

  return (
    <>
      <TracksProvider
        audioPreview={audioPreview}
        chosenTrack={chosenTrack}
        isTrackChosen={isTrackChosen}
        loading={loading}
        tracks={roundTracks}
        roundCounter={roundCounter}
        regenerateTracks={regenerateTracks}
        resetRoundCounter={resetRoundCounter}
        setIsTrackChosen={setIsTrackChosen}
      >
        <section id="play-data">
          <h2 key={round} id="round">Round {round}</h2>
          <ScoreCounter score={score} />
          <div>
            <LivesCounter lives={lives} />
            <AudioPreviewCounter counter={roundCounter} />
          </div>
          <AudioControls audioPreview={audioPreview} mute={mute} changeVolume={changeVolume} />
        </section>
        <TrackSelection />
      </TracksProvider>
    </>
  )
}

function AudioPreviewCounter({ counter }: { counter: number }) {
  return (
    <p className="text-icon">
      <div className="text-icon-wrapper">
        <Image src={hourglassIcon} alt="hourglass" className={counter < 10 ? 'turn-over-fast' : 'turn-over'} />
        <span className={counter < 10 ? 'end' : ''}>{counter}</span>
      </div>
    </p>
  );
}

export function LivesCounter({ lives }: { lives: number }) {
  return (
    <p className="text-icon">
      <div className="text-icon-wrapper">
        <Image src={heartIcon} alt="heart" className={`grow-up-${lives}`} />
        <span>{lives}</span>
      </div>
    </p>
  );
}

export { GameSession };
