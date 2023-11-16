'use client';
import { CONFIG } from "@/app/config";
import { DeezerApiFetcher } from "@/app/services/DeezerApiFetcher";
import { Track } from "@/app/types/Track";
import { Randomizer } from "@/app/utils/Randomizer";
import { useEffect, useState } from "react";

function useTrackDisplay() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [chosenTrack, setChosenTrack] = useState<Track>();
  const randomIndexes = Randomizer.generateNbs(CONFIG.nbTracksToGuess, CONFIG.maxTrackIndex);
  const tracksPromises = randomIndexes.map((index) => retrieveRandomTrack(index));
  const [trackFlag, setTrackFlag] = useState(false);
  const [audioPreview, setAudioPreview] = useState<HTMLAudioElement>();

  useEffect(() => {
    Promise.all(tracksPromises)
      .then((randomTracks) => {
        setTracks([ ...tracks, ...randomTracks.filter(Boolean) ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [trackFlag]);

  useEffect(() => {
    const chosenTrackId = Math.floor(Math.random() * CONFIG.nbTracksToGuess);

    if (tracks.length > 0) {
      const audioPreview = new Audio(tracks[chosenTrackId].preview);

      setChosenTrack(tracks[chosenTrackId]);
      setAudioPreview(audioPreview);
      audioPreview.play();
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
    regenerateTracks,
  };
}

export { useTrackDisplay }
