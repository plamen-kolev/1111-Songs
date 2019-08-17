import json
import sys

from GracefulKiller import GracefulKiller
from youtube.songEnricher import enrichSong

jsonToEnrich = {}
with open('./json/data.json') as json_data:
    print(json_data)
    jsonToEnrich = json.load(json_data)

killer = GracefulKiller()
for key in jsonToEnrich:
    for songIndex in range(0, len(jsonToEnrich[key])):
        if not killer.kill_now:
            try:
                jsonToEnrich[key][songIndex] = enrichSong(jsonToEnrich[key][songIndex])
                sys.stdout.flush()
            except Exception as e:
                if"HttpError 403 when requesting" in str(e):
                    print("Rate limit exceeded, application will terminate")
                    sys.exit(0)
                jsonToEnrich[key][songIndex]['enriched'] = True
            with open('json/data.json', 'w') as outfile:
                json.dump(jsonToEnrich, outfile, indent=4)

print("Process killed, skipping")