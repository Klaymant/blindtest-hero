const GAME_CONFIG = {
  nbTracksToGuess: 4,
  nbLives: 5,
  chartLimit: 300,
};

const ENV_VARIABLES = {
  env: process.env.NEXT_PUBLIC_ENV || 'dev',
};

export { GAME_CONFIG, ENV_VARIABLES };
