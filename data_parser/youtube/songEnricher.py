import json

from youtube.youtubeService import getYoutubePlayInfo


def enrichSong(songJson):
    if "enriched" not in songJson:
        print("enriching %s" % songJson.get('song'))
        searchTerm = "%s %s" % (songJson.get('song'), songJson.get('artist'))
        dataFromYoutube = getYoutubePlayInfo(searchTerm)
        if not dataFromYoutube:
            with open('error.json', 'w') as outfile:
                json.dump("{\"error\": \"something went wrong for song '%s'\"}" % searchTerm, outfile, indent=4)

        itemsFromYoutube = dataFromYoutube['items']
        if not itemsFromYoutube:
            with open('error.json', 'w') as outfile:
                json.dump(itemsFromYoutube, outfile, indent=4)
        theResult = itemsFromYoutube[0]
        if not theResult:
            with open('error.json', 'w') as outfile:
                json.dump(theResult, outfile, indent=4)

        songJson['youtube'] = theResult
        songJson['enriched'] = True
        return songJson
    else:
        print("enrich data exists for entry %s, skipping" % songJson.get('song'))
        return songJson