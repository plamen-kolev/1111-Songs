import {SongType} from "../components/song/Song";

export interface IJsonSong {
  id: number;
  genre: string;
  title: string;
  url: string;
  kind: SongType;
}

export const getMoreSongs = (list: IJsonSong[], chunk: number): IJsonSong[] => {
  if (!list.length) {
    return [];
  }
  const songs: IJsonSong[] = [];
  for (let i = 0; i < chunk; i++) {
    const song = list.pop();
    if (!song) {
      break;
    }
    songs.push(song);
  }
  return songs;
};

export const getRandomSong = (list: IJsonSong[]): IJsonSong | {} => {
  if (!list.length) {
    return {};
  }
  const randomSongIndex = Math.floor(Math.random() * (list.length));
  return list[randomSongIndex];
};
