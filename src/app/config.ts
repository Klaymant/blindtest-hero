const CONFIG = {
  deezerApiUri: 'https://api.deezer.com',
  nbTracksToGuess: 4,
  nbLives: 5,
  maxTrackIndex: 170,
};

const ENV_VARIABLES = {
  env: process.env.NEXT_PUBLIC_ENV || 'dev',
};

export { CONFIG, ENV_VARIABLES };
