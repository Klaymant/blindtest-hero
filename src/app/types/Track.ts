export type Track = {
  id: number,
  title: string,
  artist: {
    name: string,
  },
  album: {
    cover_medium: string,
  },
};