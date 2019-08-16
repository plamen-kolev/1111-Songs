export const getAllSongs = json => {
    let songs = [];
    const genres = Object.keys(json);
    genres.forEach(genre => {
      json[genre].forEach(song => {
        songs.push(song);
      })
    })
    return songs;
};
