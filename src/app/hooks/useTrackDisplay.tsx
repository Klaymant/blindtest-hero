'use client';
import { GAME_CONFIG } from "@/app/config";
import { SoundOptions } from "@/app/types/SoundOptions";
import { Track } from "@/app/types/Track";
import { Randomizer } from "@/app/utils/Randomizer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TrackApiFetcher } from "@/app/services/TrackApiFetcher";
import { AudioHandler } from "@/app/services/AudioHandler";
import { ScreenSelection } from "@/app/types/ScreenSelection";

function useTrackDisplay({ soundOptions, lives, setSoundOptions, setScreenSelection, loseLife }: UseTrackDisplayParams) {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [roundTracks, setRoundTracks] = useState<Track[]>([]);
  const [chosenTrack, setChosenTrack] = useState<Track>();
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement>();
  const [nextRoundFlag, setNextRoundFlag] = useState(false);
  const [generatedIds, setGeneratedIds] = useState<number[]>([]);
  const [roundCounter, setRoundCounter] = useState(GAME_CONFIG.roundDurationInSeconds);
  const [isTrackChosen, setIsTrackChosen] = useState(false);

  useEffect(function fetchChartTracks() {
    setLoading(true);

    (async function getTracks() {
      const { getTracksFromChart } = TrackApiFetcher();

      try {
        const response = await getTracksFromChart(GAME_CONFIG.chartLimit);
        const data = await response.json() as Track[];

        setTracks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(function choosingRandomTrack() {
    if (tracks.length > 0) {
      const randomIndexes = Randomizer.generateNbs(GAME_CONFIG.nbTracksToGuess, tracks.length, generatedIds);
      const randomTracks = randomIndexes.map((index) => tracks[index]);
      const chosenTrackId = Math.floor(Math.random() * randomTracks.length);
      const chosenTrackAudioPreview = new Audio(randomTracks[chosenTrackId]?.preview);
      
      chosenTrackAudioPreview.volume = soundOptions.volume;
      chosenTrackAudioPreview.muted = soundOptions.muted;
      setRoundTracks(randomTracks);
      setGeneratedIds((prev) => [...prev, randomIndexes[chosenTrackId]]);
      setChosenTrack(randomTracks[chosenTrackId]);
      setAudioPreview(chosenTrackAudioPreview);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks, nextRoundFlag]);

  useEffect(function playPreview() {
    if (audioPreview && roundTracks.every(Boolean)) {
      audioPreview.play();
  
      return function pauseAudioPreview() {
        audioPreview.pause();
      };
    }
  }, [audioPreview, roundTracks]);

  useEffect(function countdownRound() {
    if (audioPreview && roundCounter > 0 && !isTrackChosen) {
      const timer = setInterval(() => {
        setRoundCounter((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [audioPreview, roundCounter, isTrackChosen]);

  useEffect(function checkRoundCounter() {
    if (audioPreview && roundCounter === 0) {
      const chosenTrackElement = document.getElementById(String(chosenTrack?.id));

      chosenTrackElement?.classList.add('real-track');

      setTimeout(() => {
        if (lives > 1) {
          loseLife();
          regenerateTracks();
        } else
          setScreenSelection('game-over');
      }, GAME_CONFIG.timeBeforeRoundEndInMs);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioPreview, roundCounter]);

  function regenerateTracks() {
    setRoundTracks([]);
    setNextRoundFlag((prev) => !prev);
    resetRoundCounter();
    audioPreview?.pause();
  }

  function mute() {
    if (audioPreview) {
      const { copyAudioElement } = AudioHandler();
      const audioCopy = copyAudioElement(audioPreview);

      audioCopy.muted = !audioPreview.muted;
      setSoundOptions((prev) => ({ ...prev, muted: !audioPreview.muted }));
      setAudioPreview(audioCopy);
    }
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = Number(e.target.value) / 100;

    handleVolume(newVolume);
  }

  function increaseVolume() {
    const newVolume =
      audioPreview && audioPreview.volume < 0.9
        ? audioPreview.volume + 0.1
        : 1;

    handleVolume(newVolume);
  }

  function decreaseVolume() {
    const newVolume = audioPreview && audioPreview.volume > 0.1
      ? audioPreview.volume - 0.1
      : 0;

    handleVolume(newVolume);
  }

  function handleVolume(newVolume: number) {
    if (audioPreview) {
      const { copyAudioElement } = AudioHandler();
      const audioCopy = copyAudioElement(audioPreview);

      audioCopy.volume = newVolume;
      setSoundOptions((prev) => ({ ...prev, volume: newVolume }));
      setAudioPreview(audioCopy);
    }
  }

  function resetRoundCounter() {
    setRoundCounter(GAME_CONFIG.roundDurationInSeconds);
  }

  return {
    audioPreview,
    chosenTrack,
    isTrackChosen,
    loading,
    roundCounter,
    roundTracks,
    changeVolume,
    decreaseVolume,
    increaseVolume,
    mute,
    setAudioPreview,
    setIsTrackChosen,
    regenerateTracks,
    resetRoundCounter,
  };
}

type UseTrackDisplayParams = {
  lives: number;
  soundOptions: SoundOptions;
  setScreenSelection: Dispatch<SetStateAction<ScreenSelection>>;
  setSoundOptions: Dispatch<SetStateAction<SoundOptions>>;
  loseLife: () => void;
};

export { useTrackDisplay }
