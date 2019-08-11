import html
import re
import csv
import urllib.parse
import json


class Row:
    def __init__(self, unique_id, genre, a, s, year, url):
        self.unique_id = unique_id
        self.genre = genre
        self.artist = a
        self.song = s,
        self.year = year
        self.url = url


file = open("data.list", "r", encoding="utf8")
ids = []
genres = []
artists = []
songs = []
years = []

id_regexp = "^(\d+)\s\|\s(.*)"
genre_regexp = "^([\w -\]\[]+)\|\s(.*)"
artist_regexp = "^([\w ”„+$!–.&,';\(\)]+)-(.*)"
song_and_year_regexp = "^(.+)(\(.*\))"

for line in file:
    idResult = re.search(id_regexp, line)
    rest = idResult[2]
    ids.append(idResult[1])

    genreResult = re.search(genre_regexp, rest)

    genres.append(genreResult[1])
    rest = genreResult[2]

    artistResult = re.search(artist_regexp, rest)
    artists.append(artistResult[1])
    rest = artistResult[2]

    songAndYearResult = re.search(song_and_year_regexp, rest)
    songs.append(songAndYearResult[1])

    if (songAndYearResult[2]):
        years.append(songAndYearResult[2])
    else:
        years.append("-1")


def sanitizeString(string):
    return string.strip().rstrip()


jsonData = []

for i in range(0, len(years)):
    artist = sanitizeString(artists[i])
    song = sanitizeString(songs[i])
    songSearchTerm = urllib.parse.quote(html.escape("%s-%s" % (artist, song)))

    row = Row(
        int(ids[i]),
        sanitizeString(genres[i]),
        artist,
        song,
        sanitizeString(years[i]),
        "https://www.youtube.com/results?search_query=%s" % songSearchTerm
    )
    jsonData.append(row.__dict__)

genres2 = {}
for entry in jsonData:
    if entry['genre'] in genres2:
        genres2[entry['genre']].append(entry)
    else:
        genres2[entry['genre']] = [entry]

with open('data.json', 'w') as outfile:
    json.dump(genres2, outfile, indent=4)
