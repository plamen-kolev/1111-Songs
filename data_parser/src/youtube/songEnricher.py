import json

import src.youtube.youtube_service as youtube_service


def write_error_to_file(data):
    with open('error.json', 'a') as outfile:
        json.dump({'error': "%s - %s. No results found on youtube" % (data['artist'], data['song'])}, outfile, indent=4)


def enrich_song(song_json):
    if "enriched" not in song_json:
        song_json['enriched'] = True
        search_term = "%s %s" % (song_json.get('song'), song_json.get('artist'))
        data_from_youtube = youtube_service.get_youtube_play_info(search_term)
        if not data_from_youtube:
            with open('error.json', 'w') as outfile:
                json.dump("{\"error\": \"something went wrong for song '%s'\"}" % search_term, outfile, indent=4)

        items_from_youtube = data_from_youtube['items']
        if not len(items_from_youtube):
            write_error_to_file(song_json)
            return song_json

        the_result = items_from_youtube[0]
        if not the_result:
            write_error_to_file(song_json)
        song_json['youtube'] = the_result

        return song_json
    else:
        print("enrich data exists for entry %s, skipping" % song_json.get('song'))
        return song_json
