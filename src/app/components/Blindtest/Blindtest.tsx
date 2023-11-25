'use client';
import { BlindtestProvider } from "@/app/contexts/BlindtestProvider"
import { ReactNode, useState } from "react";
import { GAME_CONFIG } from "@/app/config";
import { GameSession } from "../GameSession/GameSession";
import { ScreenSelection } from "@/app/types/ScreenSelection";
import { ScreenTitle } from "../ScreenTitle/ScreenTitle";
import { GameOver } from "../GameOver/GameOver";
import { SoundOptions } from "@/app/types/SoundOptions";

const DEFAULT_AUDIO_PREVIEW_VOLUME = 0.3;

function Blindtest() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAME_CONFIG.nbLives);
  const [screenSelection, setScreenSelection] = useState<ScreenSelection>('home');
  const [soundOptions, setSoundOptions] = useState<SoundOptions>({
    muted: false,
    volume: DEFAULT_AUDIO_PREVIEW_VOLUME,
  });
  const screenSelectionMap: Record<ScreenSelection, ReactNode> = {
    'home': <ScreenTitle />,
    'game': <GameSession />,
    'game-over': <GameOver />,
  }

  function increaseScore(increase: number) {
    setScore((prev) => prev + increase);
  }

  function loseLife() {
    setLives((prev) => prev - 1);
  }

  function resetGame() {
    setScore(0);
    setLives(GAME_CONFIG.nbLives);
  }

  return (
    <BlindtestProvider
      score={score}
      lives={lives}
      screenSelection={screenSelection}
      soundOptions={soundOptions}
      increaseScore={increaseScore}
      loseLife={loseLife}
      setScreenSelection={setScreenSelection}
      setSoundOptions={setSoundOptions}
      resetGame={resetGame}
    >
      {screenSelectionMap[screenSelection]}
    </BlindtestProvider>
  );
}

export { Blindtest }
