import { useEffect } from "react";

function useGameSession({ mute, increaseVolume, decreaseVolume }: GameSessionParams) {
  useEffect(() => {
    document.addEventListener('keydown', handleEvent);

    function handleEvent(event: KeyboardEvent) {
      switch (event.key) {
        case 'm':
          mute();
          break;
        case 'ArrowRight':
          increaseVolume();
          break;
        case 'ArrowLeft':
          decreaseVolume();
          break;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEvent);
    };
  }, [mute, increaseVolume, decreaseVolume]);
}

type GameSessionParams = {
  mute: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
};

export { useGameSession };
