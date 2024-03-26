'use client';

import { Blindtest } from './components/Blindtest/Blindtest';
import { useBlindtest } from './components/Blindtest/Blindtest.hooks';
import { BlindtestProvider } from './contexts/BlindtestProvider';

export default function Home() {
  const {
    round,
    lives,
    screenSelection,
    screenSelectionMap,
    soundOptions,
    score,
    increaseRound,
    increaseScore,
    loseLife,
    setScreenSelection,
    setSoundOptions,
    resetGame,
  } = useBlindtest();

  return (
    <BlindtestProvider
      round={round}
      lives={lives}
      screenSelection={screenSelection}
      screenSelectionMap={screenSelectionMap}
      soundOptions={soundOptions}
      score={score}
      increaseRound={increaseRound}
      increaseScore={increaseScore}
      loseLife={loseLife}
      setScreenSelection={setScreenSelection}
      setSoundOptions={setSoundOptions}
      resetGame={resetGame}
    >
      <main>
        <Blindtest />
      </main>
    </BlindtestProvider>
  );
}
