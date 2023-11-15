import { ReactNode, createContext, useContext } from "react";

const BlindtestContext = createContext<BlindtestContextType | null>(null);

function useBlindtestContext() {
  const value = useContext(BlindtestContext);

  if (value === null) {
    throw new Error('No value provided');
  }

  return value;
};

function BlindtestProvider({ children, score, lives, increaseScore, loseLife }: BlindtestProviderProps) {
  return (
    <BlindtestContext.Provider value={{ score, lives, increaseScore, loseLife }}>
      {children}
    </BlindtestContext.Provider>
  );
}

type BlindtestContextType = {
  score: number;
  lives: number;
  increaseScore: (increase: number) => void;
  loseLife: () => void;
};

type BlindtestProviderProps = {
  children: ReactNode;
} & BlindtestContextType;

export { BlindtestProvider, useBlindtestContext }