import { Dispatch, ReactNode, SetStateAction, createContext, useContext } from "react";
import { Track } from "../types/Track";

const TracksContext = createContext<TracksContextType | null>(null);

function useTracksContext() {
  const value = useContext(TracksContext);

  if (value === null)
    throw new Error('No value provided for TracksContext');

  return value;
};

function TracksProvider(props: TracksProviderProps) {
  const { children, ...rest } = props;

  return (
    <TracksContext.Provider value={{ ...rest }}>
      {children}
    </TracksContext.Provider>
  );
}

type TracksContextType = {
  audioPreview: HTMLAudioElement | undefined;
  chosenTrack: Track | undefined;
  isTrackChosen: boolean;
  loading: boolean;
  tracks: Track[];
  roundCounter: number;
  regenerateTracks: () => void;
  resetRoundCounter: () => void;
  setIsTrackChosen: Dispatch<SetStateAction<boolean>>;
};

type TracksProviderProps = {
  children: ReactNode;
} & TracksContextType;

export { TracksProvider, useTracksContext };
