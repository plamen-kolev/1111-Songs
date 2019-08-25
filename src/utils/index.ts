
interface IYoutubeId {
  kind: string;
  playlistId?: string;
  videoId?: string;
}

export interface IYoutubeInterface {
  snippet: any;
  id: IYoutubeId;
}

export interface IJsonSong {
  unique_id: string;
  genre: string;
  artist: string;
  song: string;
  url: string;
  year: string;
  enriched: boolean;
  youtube?: IYoutubeInterface;
}

export const getMoreSongs = (list: string[], chunk: number): IJsonSong[] => {
  if (!list.length) {
    return [];
  }
  let songs: IJsonSong[] = [];
  for (let i = 0; i < chunk; i++) {
    const filename = list.pop();
    if (!filename) {
      break;
    }
    const foo = require(`../data/categories/${filename}`);
    songs = songs.concat(foo);
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
