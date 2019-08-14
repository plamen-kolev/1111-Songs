import json
import random

from youtube.songEnricher import enrichSong

jsonToEnrich = {}
with open('./json/data.json') as json_data:
    print(json_data)
    jsonToEnrich = json.load(json_data)

for key in jsonToEnrich:
    for songIndex in range(0, len(jsonToEnrich[key])):
        try:
            jsonToEnrich[key][songIndex] = enrichSong(jsonToEnrich[key][songIndex])

        except:
            jsonToEnrich[key][songIndex]['enriched'] = True
        with open('json/data.json', 'w') as outfile:
            json.dump(jsonToEnrich, outfile, indent=4)