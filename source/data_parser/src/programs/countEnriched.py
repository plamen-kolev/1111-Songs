import json


songsJson = {}
with open('./data/data.json') as jsonFile:
    songsJson = json.load(jsonFile)

songs = songsJson['entries']
enriched = 0
for key in songs:
    for songIndex in range(0, len(songs[key])):
        songJson = songs[key][songIndex]
        if "enriched" in songJson and songJson['enriched'] == True:
            enriched += 1

songsJson['enriched'] = enriched
with open('data/data.json', 'w') as outfile:
    json.dump(songsJson, outfile, indent=4)