import json
import os

songsJson = {}
json_file = os.path.join(os.path.dirname(__file__), "../../data/data.json")

with open(json_file) as jsonFile:
    songsJson = json.load(jsonFile)

songs = songsJson['entries']
enriched = 0
for key in songs:
    for songIndex in range(0, len(songs[key])):
        songJson = songs[key][songIndex]
        if "enriched" in songJson and songJson['enriched'] == True:
            enriched += 1

songsJson['enriched'] = enriched
with open(json_file, 'w') as outfile:
    json.dump(songsJson, outfile, indent=4)