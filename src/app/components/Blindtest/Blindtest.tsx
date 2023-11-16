'use client';
import { BlindtestProvider } from "@/app/contexts/BlindtestProvider"
import { ReactNode, useState } from "react";
import { CONFIG } from "@/app/config";
import { GameSession } from "../GameSession/GameSession";
import { ScreenSelection } from "@/app/types/ScreenSelection";
import { ScreenTitle } from "../ScreenTitle/ScreenTitle";
import { GameOver } from "../GameOver/GameOver";

function Blindtest() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(CONFIG.nbLives);
  const [screenSelection, setScreenSelection] = useState<ScreenSelection>('home');
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
    setLives(CONFIG.nbLives);
  }

  return (
    <BlindtestProvider
      score={score}
      lives={lives}
      screenSelection={screenSelection}
      increaseScore={increaseScore}
      loseLife={loseLife}
      setScreenSelection={setScreenSelection}
      resetGame={resetGame}
    >
      {screenSelectionMap[screenSelection]}
    </BlindtestProvider>
  );
}

export { Blindtest }
