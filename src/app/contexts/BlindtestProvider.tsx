import { Dispatch, ReactNode, SetStateAction, createContext, useContext } from "react";
import { ScreenSelection } from "../types/ScreenSelection";
import { SoundOptions } from "../types/SoundOptions";

const BlindtestContext = createContext<BlindtestContextType | null>(null);

function useBlindtestContext() {
  const value = useContext(BlindtestContext);

  if (value === null)
    throw new Error('No value provided for BlindtestContext');

  return value;
};

function BlindtestProvider(props: BlindtestProviderProps) {
  const { children, ...rest } = props;

  return (
    <BlindtestContext.Provider value={{ ...rest }}>
      {children}
    </BlindtestContext.Provider>
  );
}

type BlindtestContextType = {
  score: number;
  lives: number;
  screenSelection: ScreenSelection;
  soundOptions: SoundOptions;
  increaseScore: (increase: number) => void;
  loseLife: () => void;
  setScreenSelection: Dispatch<SetStateAction<ScreenSelection>>;
  setSoundOptions: Dispatch<SetStateAction<SoundOptions>>;
  resetGame: () => void;
};

type BlindtestProviderProps = {
  children: ReactNode;
} & BlindtestContextType;

export { BlindtestProvider, useBlindtestContext }