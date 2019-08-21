import genresList from "../data/categories_lookup.json";

genresList.sort(() => Math.random() - 0.5);
const genresForRandomPlay = genresList;

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
  enriched: boolean;
  youtube: IYoutubeInterface;
}

const chunksToLoad = 24;

// THERE ARE DEAD SONGS, because we load 32 genres,
// each genre can have multiple songs, if it goes above 32 entries per
// chunk, this function will truncate it
// const songsToAppend = songs.splice(0, chunksToLoad);

export const getMoreSongs = () => {
  let songs: IJsonSong[] = [];
  for (let i = 0; i < chunksToLoad; i++) {
    const filename = genresList.pop();
    if (!filename) {
      break;
    }
    const foo = require(`../data/categories/${filename}`);
    songs = songs.concat(foo);
  }
  return songs.splice(0, chunksToLoad);
};

export const playRandomSong = () => {
  const randomGenreIndex = Math.floor(Math.random() * (genresForRandomPlay.length));
  const randomGenre = require(`../data/categories/${genresForRandomPlay[randomGenreIndex]}`);
  return randomGenre[Math.floor(Math.random() * randomGenre.length)];
};
