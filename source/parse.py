import re

file = open("data.list", "r", encoding="utf8")
ids = []
genres = []
artists = []
songs = []

sentence_regexp = "[\w+,&.'\-\(\)$!–„” ]"
id_regexp = "^(\d+)\s\|\s(.*)"
genre_regexp = "([\w -\]\[]+)\|\s(.*)"
artist_regexp = "([\w .&,]+)-(.*)"
# artists_regexp = ".+\|.+\|(\s%s+)" % sentence_regexp
# songs_regexp = "^.+\|.+\|\s%s+-\s(.+)[(]?" % sentence_regexp


for line in file:
    idResult = re.search(id_regexp, line)
    id = idResult[1]
    rest = idResult[2]
    ids.append(id)

    genreResult = re.search(genre_regexp, rest)
    genre = genreResult[1]
    genres.append(genre)
    rest = genreResult[2]

    artistResult = re.search(artist_regexp, rest)
    artist = artistResult[1]
    rest = artistResult[2]

    print(artist)

    # genres.append(re.search(genres_regexp, line)[1])
    # artists.append(re.search(artists_regexp, line)[1])
    #
    # song_and_year = re.search(songs_regexp, line)[1]
    # print(songs_regexp)
    # print(song_and_year)