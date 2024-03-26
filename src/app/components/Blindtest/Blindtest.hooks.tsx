import { GAME_CONFIG } from "@/app/config";
import { ScreenSelection } from "@/app/types/ScreenSelection";
import { SoundOptions } from "@/app/types/SoundOptions";
import { ReactNode, useState } from "react";
import { ScreenTitle } from "../ScreenTitle/ScreenTitle";
import { GameSession } from "../GameSession/GameSession";
import { GameOver } from "../GameOver/GameOver";

function useBlindtest() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAME_CONFIG.nbLives);
  const [screenSelection, setScreenSelection] = useState<ScreenSelection>('home');
  const [soundOptions, setSoundOptions] = useState<SoundOptions>({
    muted: false,
    volume: GAME_CONFIG.defaultAudioPreviewVolume,
  });
  const screenSelectionMap: Record<ScreenSelection, ReactNode> = {
    'home': <ScreenTitle />,
    'game': <GameSession />,
    'game-over': <GameOver />,
  };

  function increaseRound(increase: number) {
    setRound((prev) => prev + increase);
  }

  function increaseScore(increase: number) {
    setScore((prev) => prev + increase);
  }

  function loseLife() {
    setLives((prev) => prev - 1);
  }

  function resetGame() {
    setScore(0);
    setRound(1);
    setLives(GAME_CONFIG.nbLives);
  }

  return {
    round,
    lives,
    screenSelection,
    soundOptions,
    screenSelectionMap,
    score,
    increaseRound,
    increaseScore,
    loseLife,
    setScreenSelection,
    setSoundOptions,
    resetGame,
  };
}

export { useBlindtest };
