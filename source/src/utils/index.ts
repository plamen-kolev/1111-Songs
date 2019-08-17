export type YoutubeInterface = {
  snippet: any
}

export type JsonSong = {
  unique_id: string,
  genre: string,
  artist: string,
  song: string,
  url: string,
  enriched: boolean,
  youtube: YoutubeInterface
}

type JsonBlob = {
  [key: string]: JsonSong[];
} 

export const getAllSongs = (data: any) => {
    const json: JsonBlob = data.default
    let songs: JsonSong[] = [];
    
    const genres: string[] = Object.keys(json);
    genres.forEach((genre: string) => {

      json[genre].forEach((song: JsonSong) => {
        songs.push(song);
      })
    })
    return songs;
};