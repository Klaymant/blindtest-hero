'use client';
import { GAME_CONFIG } from "@/app/config";
import { TrackApiFetcher } from "@/app/services/TrackApiFetcher";
import { SoundOptions } from "@/app/types/SoundOptions";
import { Track } from "@/app/types/Track";
import { Randomizer } from "@/app/utils/Randomizer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useTrackDisplay({ soundOptions, setSoundOptions }: UseTrackDisplayParams) {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [chosenTrack, setChosenTrack] = useState<Track>();
  const [trackFlag, setTrackFlag] = useState(false);
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement>();

  useEffect(() => {
    const randomIndexes = Randomizer.generateNbs(GAME_CONFIG.nbTracksToGuess, GAME_CONFIG.maxTrackIndex);
    const tracksPromises = randomIndexes.map((index) => retrieveRandomTrack(index));

    setLoading(true);
    Promise.all(tracksPromises)
      .then((randomTracks) => {
        setTracks([ ...tracks, ...randomTracks.filter(Boolean) ]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trackFlag]);

  useEffect(() => {
    if (tracks.length > 0) {
      const chosenTrackId = Math.floor(Math.random() * GAME_CONFIG.nbTracksToGuess);
      const randomAudioPreview = new Audio(tracks[chosenTrackId].preview);

      randomAudioPreview.volume = soundOptions.volume;
      randomAudioPreview.muted = soundOptions.muted;
      setChosenTrack(tracks[chosenTrackId]);
      setAudioPreview(randomAudioPreview);
    }
  }, [tracks]);

  useEffect(() => {
    if (audioPreview) {
      audioPreview.play();
  
      return function pauseAudioPreview() {
        audioPreview.pause();
      };
    }
  }, [audioPreview]);

  async function retrieveRandomTrack(index: number): Promise<Track> {
    const { getTrackFromChart } = TrackApiFetcher();
    const response = await getTrackFromChart(index);
    const data = await response.json();

    return data;
  }

  function regenerateTracks() {
    setTracks([]);
    audioPreview?.pause();
    setTrackFlag((prev) => !prev);
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
    tracks,
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
