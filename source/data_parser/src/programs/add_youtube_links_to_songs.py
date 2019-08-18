import json
import os
import sys

from src.GracefulKiller import GracefulKiller
from src.youtube.songEnricher import enrich_song

killer = GracefulKiller()

json_file = os.path.join(os.path.dirname(__file__), "../../data/data.json")
jsonToEnrich = {}
with open(json_file) as json_data:
    jsonToEnrich = json.load(json_data)


def enrich(song_data):
    song = {}
    if not killer.kill_now:
        try:
            song = enrich_song(song_data)
            sys.stdout.flush()
        except Exception as e:
            if "HttpError 403 when requesting" in str(e):
                print()
                sys.stderr.write("Rate limit exceeded, application will terminate")
                sys.exit(0)
            song['enriched'] = True
            sys.stderr.write(str(e))
            sys.exit(0)
        with open(json_file, 'w') as outfile:
            json.dump(jsonToEnrich, outfile, indent=4)


def main(songs_json):
    song_entries = songs_json['entries']
    for key in song_entries:
        for songIndex in range(0, len(song_entries[key])):
            song_data = song_entries[key][songIndex]
            enrich(song_data)


if __name__ == '__main__':
    main(jsonToEnrich)
