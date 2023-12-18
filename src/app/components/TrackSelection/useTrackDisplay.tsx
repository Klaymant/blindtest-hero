'use client';
import { GAME_CONFIG } from "@/app/config";
import { SoundOptions } from "@/app/types/SoundOptions";
import { Track } from "@/app/types/Track";
import { Randomizer } from "@/app/utils/Randomizer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TrackApiFetcher } from "@/app/services/TrackApiFetcher";
import { AudioHandler } from "@/app/services/AudioHandler";

function useTrackDisplay({ soundOptions, setSoundOptions }: UseTrackDisplayParams) {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [roundTracks, setRoundTracks] = useState<Track[]>([]);
  const [chosenTrack, setChosenTrack] = useState<Track>();
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement>();
  const [nextRoundFlag, setNextRoundFlag] = useState(false);
  const [generatedIds, setGeneratedIds] = useState<number[]>([]);
  const [currentAudioPreviewTime, setCurrentAudioPreviewTime] = useState(0);

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
  }, [tracks, nextRoundFlag]);

  useEffect(function playPreview() {
    if (audioPreview && roundTracks.every(Boolean)) {
      audioPreview.play();
  
      return function pauseAudioPreview() {
        audioPreview.pause();
      };
    }
  }, [audioPreview]);

  useEffect(function delayAudioTimer() {
    if (audioPreview && currentAudioPreviewTime <= 30) {
      const timer = setInterval(() => {
        setCurrentAudioPreviewTime(audioPreview.currentTime);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [audioPreview, currentAudioPreviewTime]);

  function regenerateTracks() {
    setRoundTracks([]);
    setNextRoundFlag((prev) => !prev);
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

  function resetCurrentAudioPreviewTime() {
    setCurrentAudioPreviewTime(0);
  }

  return {
    roundTracks,
    chosenTrack,
    loading,
    audioPreview,
    currentAudioPreviewTime,
    changeVolume,
    increaseVolume,
    decreaseVolume,
    setAudioPreview,
    resetCurrentAudioPreviewTime,
    regenerateTracks,
    mute,
  };
}

type UseTrackDisplayParams = {
  soundOptions: SoundOptions;
  setSoundOptions: Dispatch<SetStateAction<SoundOptions>>;
};

export { useTrackDisplay }
