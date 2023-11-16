'use client';
import { BlindtestProvider } from "@/app/contexts/BlindtestProvider"
import { useState } from "react";
import { CONFIG } from "@/app/config";
import { GameSession } from "../GameSession/GameSession";
import { ScreenSelection } from "@/app/types/ScreenSelection";
import { ScreenTitle } from "../ScreenTitle/ScreenTitle";

function Blindtest() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(CONFIG.nbLives);
  const [screenSelection, setScreenSelection] = useState<ScreenSelection>('home');

  function increaseScore(increase: number) {
    setScore(score + increase);
  }

  function loseLife() {
    setLives(lives - 1);
  }

  return (
    <BlindtestProvider
      score={score}
      lives={lives}
      screenSelection={screenSelection}
      increaseScore={increaseScore}
      loseLife={loseLife}
      setScreenSelection={setScreenSelection}
    >
      {screenSelection === 'home' && <ScreenTitle />}
      {screenSelection === 'game' && <GameSession />}
    </BlindtestProvider>
  );
}

export { Blindtest }
