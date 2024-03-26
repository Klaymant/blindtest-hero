import { GAME_CONFIG } from "@/app/config";
import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import { useTracksContext } from "@/app/contexts/TracksProvider";
import { Track } from "@/app/types/Track";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

export function useTrackSelection() {
  const {
    chosenTrack,
    isTrackChosen,
    loading,
    tracks,
    roundCounter,
    regenerateTracks,
    resetRoundCounter,
    setIsTrackChosen,
  } = useTracksContext();
  const { lives, round, increaseRound, increaseScore, loseLife, setScreenSelection } = useBlindtestContext();
  const [showRoundBreak, setShowRoundBreak] = useState(false);

  function guessTrack(e: SyntheticEvent, trackId: number) {
    let currentLives = lives;

    if (trackId === chosenTrack?.id) {
      e.currentTarget.classList.add('success');
      increaseScore(calculateRoundScore());
    } else {
      const chosenTrackElement = document.getElementById(String(chosenTrack?.id));
      
      e.currentTarget.classList.add('fail');
      chosenTrackElement?.classList.add('real-track');
      loseLife();
      currentLives--;
    }

    handleRoundEnd(currentLives);
  }

  function calculateRoundScore() {
    return roundCounter * GAME_CONFIG.scoreFactor;
  }

  function handleRoundEnd(currentLives: number) {
    setTimeout(() => {
      if (currentLives > 0) {
        handleNextRound();
      } else
        setScreenSelection('game-over');
    }, GAME_CONFIG.timeBeforeRoundEndInMs);
  }

  function handleNextRound() {
    resetRoundCounter();
    setShowRoundBreak(true);
    increaseRound(1);
    setIsTrackChosen(false);
    setTimeout(() => {
      regenerateTracks();
      setShowRoundBreak(false);
    }, GAME_CONFIG.timeBeforeNextRoundInMs);
  }

  return {
    chosenTrack,
    isTrackChosen,
    loading,
    tracks,
    showRoundBreak,
    round,
    lives,
    guessTrack,
    setIsTrackChosen,
  };
}

type TrackSelectionParams = {
  chosenTrack: Track | null;
  isTrackChosen: boolean;
  loading: boolean;
  tracks: Track[];
  regenerateTracks: () => void;
  resetRoundCounter: () => void;
  setIsTrackChosen: Dispatch<SetStateAction<boolean>>;
};
