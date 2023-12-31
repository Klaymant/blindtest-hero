import { ENV_VARIABLES } from "../config";
import { Env } from "../types/Env";
import 'cross-fetch/polyfill';

const BACKEND_APIS: Record<Env, string> = {
  dev: 'http://localhost:8000',
  prod: 'https://blindtest-hero-backend.com',
};
const env = ENV_VARIABLES.env as Env;

function TrackApiFetcher() {
  const publicApi = {
    getTrackFromChart,
    getTracksFromChart,
  };

  function getTrackFromChart(index: number): Promise<Response> {
    return fetch(BACKEND_APIS[env] + '/chart/track/' + index.toString());
  }

  function getTracksFromChart(limit: number): Promise<Response> {
    return fetch(BACKEND_APIS[env] + '/chart/tracks/' + limit.toString());
  }

  return publicApi;
}

export { TrackApiFetcher };
