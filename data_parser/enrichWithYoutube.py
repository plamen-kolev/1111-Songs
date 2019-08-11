import json
import random

from youtube.songEnricher import enrichSong

jsonToEnrich = {}
with open('./json/data.json') as json_data:
    print(json_data)
    jsonToEnrich = json.load(json_data)


genre, songs = random.choice(list(jsonToEnrich.items()))
randomSongIndex = random.randint(0,len(songs) - 1)
print(randomSongIndex)

jsonToEnrich[genre][randomSongIndex] = enrichSong(songs[randomSongIndex])
# for key in jsonToEnrich:
#     for songIndex in range(0, len(jsonToEnrich[key])):
#         jsonToEnrich[key][songIndex] = enrichSong(jsonToEnrich[key][songIndex])
#         break
#     break
with open('json/data.json', 'w') as outfile:
    json.dump(jsonToEnrich, outfile, indent=4)
