export enum SongKind {
  VIDEO = "youtube#video",
  PLAYLIST = "youtube#playlist",
  NONE = ""
}

export interface IJsonSong {
  id: number;
  genre: string;
  title: string;
  kind: string;
  url: string;
  active?: boolean;
}

export const getMoreSongs = (list: IJsonSong[], chunk: number): IJsonSong[] => {
  let songs: IJsonSong[] = [];
  if (!list.length) {
    return [];
  }
  
  for (let i = 0; i < chunk; i++) {
    const song = list.pop();
    if(!song) {
      return songs;
    }
    songs = songs.concat(song);
  }
  return songs;
};

export const getRandomSong = (list: string[]) => {
  if (!list.length) {
    return {};
  }
  const randomGenreIndex = Math.floor(Math.random() * (list.length));
  const randomGenre = require(`../data/categories/${list[randomGenreIndex]}`);
  return randomGenre[Math.floor(Math.random() * randomGenre.length)];
};
