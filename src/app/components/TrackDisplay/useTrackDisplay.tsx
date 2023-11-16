'use client';
import { CONFIG } from "@/app/config";
import { DeezerApiFetcher } from "@/app/services/DeezerApiFetcher";
import { Track } from "@/app/types/Track";
import { Randomizer } from "@/app/utils/Randomizer";
import { useEffect, useState } from "react";

function useTrackDisplay() {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [chosenTrack, setChosenTrack] = useState<Track>();
  const [trackFlag, setTrackFlag] = useState(false);
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement>();

  useEffect(() => {
    const randomIndexes = Randomizer.generateNbs(CONFIG.nbTracksToGuess, CONFIG.maxTrackIndex);
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
      const chosenTrackId = Math.floor(Math.random() * CONFIG.nbTracksToGuess);
      const randomAudioPreview = new Audio(tracks[chosenTrackId].preview);

      setChosenTrack(tracks[chosenTrackId]);
      setAudioPreview(randomAudioPreview);
      randomAudioPreview.play();

      return () => {
        randomAudioPreview.pause();
      };
    }
  }, [tracks]);

  async function retrieveRandomTrack(index: number) {
    const { getTrackFromChart } = DeezerApiFetcher();
    const response = await getTrackFromChart(index);
    const data = await response.json();

    return data.tracks.data[0];
  }

  function regenerateTracks() {
    setTracks([]);
    audioPreview?.pause();
    setTrackFlag((prev) => !prev);
  }

  return {
    tracks,
    chosenTrack,
    loading,
    regenerateTracks,
  };
}

export { useTrackDisplay }
