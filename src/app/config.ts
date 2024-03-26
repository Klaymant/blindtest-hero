const GAME_CONFIG = {
  nbTracksToGuess: 4,
  nbLives: 5,
  chartLimit: 300,
  timeBeforeRoundEndInMs: 1500,
  timeBeforeNextRoundInMs: 2000,
  defaultAudioPreviewVolume: 0.3,
  roundDurationInSeconds: 30,
  scoreFactor: 100,
};

const ENV_VARIABLES = {
  env: process.env.NEXT_PUBLIC_ENV || 'dev',
};

export { GAME_CONFIG, ENV_VARIABLES };
