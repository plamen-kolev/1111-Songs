import json
import os
import sys

from src.GracefulKiller import GracefulKiller
from src.youtube.songEnricher import enrich_song


json_file = os.path.join(os.path.dirname(__file__), "../../data/data.json")
simplified_file = os.path.join(os.path.dirname(__file__), "../../data/simplified.json")
jsonToSimplify = {}
simplified = []
with open(json_file) as json_data:
    jsonToSimplify = json.load(json_data)


def main(songs_json):
    song_entries = songs_json['entries']
    for key in song_entries:
        for songIndex in range(0, len(song_entries[key])):
            entry = song_entries[key][songIndex]

            kind = "none"
            url = entry['url']
            title = "%s - %s" % (entry['artist'], entry['song'])
            if "youtube" in entry and "snippet" in entry['youtube']:
                title = entry["youtube"]["snippet"]["title"]
                kind = entry["youtube"]["id"]["kind"]

                if "videoId" in entry["youtube"]["id"]:
                    url = entry["youtube"]["id"]["videoId"]

                if "playlistId" in entry["youtube"]["id"]:
                    url = entry["youtube"]["id"]["playlistId"]

            simplified.append({
                "genre": entry["genre"],
                "id": entry["unique_id"],
                "title": title,
                "kind": kind,
                "url": url
            })
    with open(simplified_file, 'w') as outfile:
        json.dump(simplified, outfile, indent=4)


if __name__ == '__main__':
    main(jsonToSimplify)
