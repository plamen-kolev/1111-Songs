from youtube.youtubeService import getYoutubePlayInfo


def enrichSong(songJson):
    if "enriched" not in songJson:
        print("enriching %s" % songJson.get('song'))
        dataFromYoutube = getYoutubePlayInfo("%s %s" % (songJson.get('song'), songJson.get('artist')))['items'][0]

        songJson['youtube'] = dataFromYoutube
        songJson['enriched'] = True
        return songJson
    else:
        print("enrich data exists for entry %s, skipping" % songJson.get('song'))
        return songJson