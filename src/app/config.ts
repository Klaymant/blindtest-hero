const GAME_CONFIG = {
  nbTracksToGuess: 4,
  nbLives: 5,
  chartLimit: 300,
  timeBeforeNextRoundInMs: 1500,
  defaultAudioPreviewVolume: 0.3,
};

const ENV_VARIABLES = {
  env: process.env.NEXT_PUBLIC_ENV || 'dev',
};

export { GAME_CONFIG, ENV_VARIABLES };
