'use client';
import { GAME_CONFIG } from "@/app/config";
import { SoundOptions } from "@/app/types/SoundOptions";
import { Track } from "@/app/types/Track";
import { Randomizer } from "@/app/utils/Randomizer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TrackApiFetcher } from "@/app/services/TrackApiFetcher";

function useTrackDisplay({ soundOptions, setSoundOptions }: UseTrackDisplayParams) {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [roundTracks, setRoundTracks] = useState<Track[]>([]);
  const [chosenTrack, setChosenTrack] = useState<Track>();
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement>();
  const [nextRoundFlag, setNextRoundFlag] = useState(false);
  const [generatedIds, setGeneratedIds] = useState<number[]>([]);

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

      setRoundTracks(randomTracks);

      const chosenTrackId = Math.floor(Math.random() * randomTracks.length);
      const randomAudioPreview = new Audio(randomTracks[chosenTrackId]?.preview);

      setGeneratedIds((prev) => [...prev, randomIndexes[chosenTrackId]]);
      randomAudioPreview.volume = soundOptions.volume;
      randomAudioPreview.muted = soundOptions.muted;
      setChosenTrack(randomTracks[chosenTrackId]);
      setAudioPreview(randomAudioPreview);
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

  function regenerateTracks() {
    setRoundTracks([]);
    setNextRoundFlag((prev) => !prev);
    audioPreview?.pause();
  }

  function mute() {
    if (audioPreview) {
      const audioCopy = copyAudioElement(audioPreview);

      audioCopy.muted = !audioPreview.muted;
      setSoundOptions((prev) => ({ ...prev, muted: !audioPreview.muted }));
      setAudioPreview(audioCopy);
    }
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioPreview) {
      const audioCopy = copyAudioElement(audioPreview);

      audioCopy.volume = e.target.valueAsNumber / 100;
      setSoundOptions((prev) => ({ ...prev, volume: e.target.valueAsNumber / 100 }));
      setAudioPreview(audioCopy);
    }
  }

  function copyAudioElement(audio: HTMLAudioElement): HTMLAudioElement {
    const audioCopy = new Audio(audio.src);

    audioCopy.muted = audio.muted;
    audioCopy.currentTime = audio.currentTime;
    audioCopy.volume = audio.volume;
    return audioCopy;
  }

  return {
    roundTracks,
    chosenTrack,
    loading,
    audioPreview,
    changeVolume,
    setAudioPreview,
    regenerateTracks,
    mute,
  };
}

type UseTrackDisplayParams = {
  soundOptions: SoundOptions;
  setSoundOptions: Dispatch<SetStateAction<SoundOptions>>;
};

export { useTrackDisplay }
