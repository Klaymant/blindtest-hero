import { CONFIG } from "../config";

function DeezerApiFetcher() {
  const publicApi = {
    getTrackFromChart,
  };

  function getTrackFromChart(index: number): Promise<Response> {
    const searchParams = new URLSearchParams({
      limit: '2', // 2 for API returns one less track than the given limit
      index: index.toString(),
    });

    return fetch(CONFIG.deezerApiUri + '/chart' + '?' + searchParams.toString());
  }

  return publicApi;
}

export { DeezerApiFetcher };
