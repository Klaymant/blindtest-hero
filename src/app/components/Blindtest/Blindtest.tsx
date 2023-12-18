'use client';
import { BlindtestProvider } from "@/app/contexts/BlindtestProvider"
import { useBlindtest } from "./Blindtest.hooks";

function Blindtest() {
  const {
    score,
    lives,
    screenSelection,
    screenSelectionMap,
    soundOptions,
    increaseScore,
    loseLife,
    setScreenSelection,
    setSoundOptions,
    resetGame,
  } = useBlindtest();

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

export { Blindtest };
