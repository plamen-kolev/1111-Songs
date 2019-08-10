import html
import re
import csv
import urllib.parse
import json

class Genre:
    pass

class Artist:
    pass

class Row:
    def __init__(self, uniqueId, genre, artist, song ,year, url):
        self.uniqueId = uniqueId
        self.genre = genre
        self.artist = artist
        self.song = song,
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
    id = idResult[1]
    rest = idResult[2]
    ids.append(id)

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


csvFile = csv.writer(open('data.csv', "w", encoding="utf8", newline=''))
csvFile.writerow(["id", "genre", "artist", "song", "year", "youtube search"])
for i in range(0, len(years)):
    artist = sanitizeString(artists[i])
    song = sanitizeString(songs[i])
    songSearchTerm = urllib.parse.quote(html.escape("%s-%s" % (artist, song)))
    csvFile.writerow([
        int(ids[i]),
        sanitizeString(genres[i]),
        artist,
        song,
        sanitizeString(years[i]),
        "https://www.youtube.com/results?search_query=%s" % songSearchTerm
    ])

jsonFile = open('data.json', "w", encoding="utf8", newline='')
jsonFile.write("[")
for i in range(0, len(years)):
    artist = sanitizeString(artists[i])
    song = sanitizeString(songs[i])
    row = Row(
        int(ids[i]),
        sanitizeString(genres[i]),
        artist,
        song,
        sanitizeString(years[i]),
        "https://www.youtube.com/results?search_query=%s" % songSearchTerm
    )
    jsonFile.write(json.dumps(row.__dict__))
    jsonFile.write(",")
jsonFile.write("]")
