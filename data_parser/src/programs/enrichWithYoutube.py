import json
import sys

from src.GracefulKiller import GracefulKiller
from src.youtube.songEnricher import enrich_song

killer = GracefulKiller()
json_file = '../../data/data.json'
jsonToEnrich = {}
with open(json_file) as json_data:
    print(json_data)
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


def main():
    for key in jsonToEnrich['entries']:
        for songIndex in range(0, len(jsonToEnrich[key])):
            song_data = jsonToEnrich['entries'][key][songIndex]
            enrich(song_data)


if __name__ == '__main__':
    main()
