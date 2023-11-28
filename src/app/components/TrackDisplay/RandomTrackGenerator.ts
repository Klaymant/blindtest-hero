import { TrackApiFetcher } from "@/app/services/TrackApiFetcher";
import { Track } from "@/app/types/Track";

export const RandomTrackGenerator = {
  async retrieveRandomTrack(index: number): Promise<Track> {
    const { getTrackFromChart } = TrackApiFetcher();
  
    try {
      const response = await getTrackFromChart(index);
      const data = await response.json();
  
      return data;
    } catch {
      throw new Error('empty-track');
    }
  }
}