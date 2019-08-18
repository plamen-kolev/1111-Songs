import html
import re
import urllib.parse
import json
from src.models import SongEntry

"""
This module is used to parse the initial data.list file to provide the initial functionality of the website
"""

file = open("data/data.list", "r", encoding="utf8")

id_regexp = "^(\d+)\s\|\s(.*)"
genre_regexp = "^([\w -\]\[]+)\|\s(.*)"
artist_regexp = "^([\w ”„+$!–.&,';\(\)]+)-(.*)"
song_and_year_regexp = "^(.+)(\(.*\))"


def sanitize_string(string):
    return string.strip().rstrip()


jsonData = {}

for line in file:
    idResult = re.search(id_regexp, line)
    rest = idResult[2]
    id = int(idResult[1])

    genreResult = re.search(genre_regexp, rest)

    genre = genreResult[1]
    rest = genreResult[2]

    artistResult = re.search(artist_regexp, rest)
    artist = sanitize_string(artistResult[1])
    rest = artistResult[2]
    songAndYearResult = re.search(song_and_year_regexp, rest)

    song = sanitize_string(songAndYearResult[1])
    year = "-1"

    if (songAndYearResult[2]):
        year = sanitize_string(songAndYearResult[2])

    songSearchTerm = urllib.parse.quote(html.escape("%s-%s" % (artist, song)))
    row = SongEntry(
        id,
        genre,
        artist,
        song,
        year,
        "https://www.youtube.com/results?search_query=%s" % songSearchTerm
    )

    entryAsJson = row.__dict__

    if row.genre in jsonData:
        jsonData[row.genre].append(entryAsJson)
    else:
        jsonData[row.genre] = [entryAsJson]


with open('data/data.json', 'w') as outfile:
    json.dump(jsonData, outfile, indent=4)
