import { ReactNode, createContext, useContext } from "react";
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
  loading: boolean;
  tracks: Track[];
  chosenTrack: Track | undefined;
  audioPreview: HTMLAudioElement | undefined;
  currentAudioPreviewTime: number;
  regenerateTracks: () => void;
  resetCurrentAudioPreviewTime: () => void;
};

type TracksProviderProps = {
  children: ReactNode;
} & TracksContextType;

export { TracksProvider, useTracksContext };
