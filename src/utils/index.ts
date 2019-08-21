type YoutubeId = {
  kind: string,
  playlistId?: string,
  videoId?: string
}

export type YoutubeInterface = {
  snippet: any,
  id: YoutubeId
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