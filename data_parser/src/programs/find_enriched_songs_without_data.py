import json
import os

songsJson = {}
json_file = os.path.join(os.path.dirname(__file__), "../../data/data.json")

with open(json_file) as jsonFile:
    songsJson = json.load(jsonFile)

songs = songsJson['entries']

for key in songs:
    for songIndex in range(0, len(songs[key])):
        songJson = songs[key][songIndex]
        if "enriched" in songJson and songJson['enriched'] is True and 'youtube' not in songJson:
            print("Genre: %s\nUrl: %s\n\n" % (songJson['genre'], songJson['url']))

# with open(json_file, 'w') as outfile:
#     json.dump(songsJson, outfile, indent=4)