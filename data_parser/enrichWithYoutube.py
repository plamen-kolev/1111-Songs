import json
import sys

from GracefulKiller import GracefulKiller
from youtube.songEnricher import enrichSong

jsonToEnrich = {}
with open('./json/data.json') as json_data:
    print(json_data)
    jsonToEnrich = json.load(json_data)

killer = GracefulKiller()
for key in jsonToEnrich['entries']:
    for songIndex in range(0, len(jsonToEnrich[key])):
        song = jsonToEnrich['entries'][key][songIndex]
        if not killer.kill_now:
            try:
                song = enrichSong(song)
                sys.stdout.flush()
            except Exception as e:
                if"HttpError 403 when requesting" in str(e):
                    print("Rate limit exceeded, application will terminate")
                    sys.exit(0)
                song['enriched'] = True
            with open('json/data.json', 'w') as outfile:
                json.dump(jsonToEnrich, outfile, indent=4)

print("Process killed, skipping")