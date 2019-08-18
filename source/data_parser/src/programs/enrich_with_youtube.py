import json
import sys

from src.GracefulKiller import GracefulKiller
from src.youtube.songEnricher import enrich_song

killer = GracefulKiller()
json_file = '../../data/data.json'
jsonToEnrich = {}
with open(json_file) as json_data:
    jsonToEnrich = json.load(json_data)


def enrich(song_data):
    if not killer.kill_now:
        try:
            song = enrich_song(song_data)
            sys.stdout.flush()
        except Exception as e:
            if "HttpError 403 when requesting" in str(e):
                print("Rate limit exceeded, application will terminate")
                sys.exit(0)
            song['enriched'] = True
        with open(json_file, 'w') as outfile:
            json.dump(jsonToEnrich, outfile, indent=4)


def main(songsJson):
    song_entries = songsJson['entries']
    for key in song_entries:
        for songIndex in range(0, len(song_entries[key])):
            song_data = song_entries[key][songIndex]
            enrich(song_data)


if __name__ == '__main__':
    main(jsonToEnrich)
