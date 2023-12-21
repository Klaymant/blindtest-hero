'use client';
import { BlindtestProvider } from "@/app/contexts/BlindtestProvider"
import { useBlindtest } from "./Blindtest.hooks";

function Blindtest() {
  const {
    round,
    lives,
    screenSelection,
    screenSelectionMap,
    soundOptions,
    increaseRound,
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
      soundOptions={soundOptions}
      increaseRound={increaseRound}
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
