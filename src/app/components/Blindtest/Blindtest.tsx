'use client';
import { BlindtestProvider } from "@/app/contexts/BlindtestProvider"
import TrackDisplay from "../TrackDisplay/TrackDisplay"
import { useState } from "react";
import { CONFIG } from "@/app/config";

function Blindtest() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(CONFIG.nbLives);

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
      increaseScore={increaseScore}
      loseLife={loseLife}
    >
      <section id="play-data">
        <p id="score">Score: <span>{score}</span></p>
        <p id="lives">Lives: <span>{lives}</span></p>
      </section>
      <TrackDisplay />
    </BlindtestProvider>
  );
}

export { Blindtest }
