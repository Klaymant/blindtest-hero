import { ENV_VARIABLES } from "../config";
import { Env } from "../types/Env";

const BACKEND_APIS: Record<Env, string> = {
  dev: 'http://localhost:8000',
  prod: 'https://blindtest-hero-backend.com',
};
const env = ENV_VARIABLES.env as Env;

function TrackApiFetcher() {
  const publicApi = {
    getTrackFromChart,
  };

  function getTrackFromChart(index: number) {
    return fetch(BACKEND_APIS[env] + '/chart/track/' + index.toString());
  }

  return publicApi;
}

export { TrackApiFetcher };
