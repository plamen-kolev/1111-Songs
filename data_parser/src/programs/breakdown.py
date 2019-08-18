import json
import os

songsJson = {}
json_file = os.path.join(os.path.dirname(__file__), "../../data/data.json")

with open(json_file) as jsonFile:
    songsJson = json.load(jsonFile)

mapping = {}
for i in songsJson['entries']:
    data = songsJson['entries'][i]
    filename = i.replace(" ", "_")
    filename = filename.strip()

    mapping.update({i: filename})
    with open(os.path.join(os.path.dirname(__file__), "../../data/categories/%s.json" % filename), "w") as jsonFile:
        json.dump(data, jsonFile, indent=4)

with open(os.path.join(os.path.dirname(__file__), "../../data/categories_lookup.json"), "w") as jsonFile:
    json.dump(mapping, jsonFile, indent=4)