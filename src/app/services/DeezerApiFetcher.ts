import { ENV_VARIABLES } from "../config";
import { Env } from "../types/Env";

const BACKEND_APIS: Record<Env, string> = {
  dev: 'http://localhost:8000',
  prod: 'http://217.160.192.132/blindtest',
};
const env = ENV_VARIABLES.env as Env;

function DeezerApiFetcher() {
  const publicApi = {
    getTrackFromChart,
  };

  function getTrackFromChart(index: number) {
    return fetch(BACKEND_APIS[env] + '/chart/track/' + index.toString());
  }

  return publicApi;
}

export { DeezerApiFetcher };
