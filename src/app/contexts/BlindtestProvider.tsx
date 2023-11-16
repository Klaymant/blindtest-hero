import { Dispatch, ReactNode, SetStateAction, createContext, useContext } from "react";
import { ScreenSelection } from "../types/ScreenSelection";

const BlindtestContext = createContext<BlindtestContextType | null>(null);

function useBlindtestContext() {
  const value = useContext(BlindtestContext);

  if (value === null) {
    throw new Error('No value provided');
  }

  return value;
};

function BlindtestProvider({ children, score, lives, screenSelection, increaseScore, loseLife, setScreenSelection }: BlindtestProviderProps) {
  return (
    <BlindtestContext.Provider value={{ score, lives, screenSelection, increaseScore, loseLife, setScreenSelection }}>
      {children}
    </BlindtestContext.Provider>
  );
}

type BlindtestContextType = {
  score: number;
  lives: number;
  screenSelection: ScreenSelection;
  increaseScore: (increase: number) => void;
  loseLife: () => void;
  setScreenSelection: Dispatch<SetStateAction<ScreenSelection>>;
};

type BlindtestProviderProps = {
  children: ReactNode;
} & BlindtestContextType;

export { BlindtestProvider, useBlindtestContext }