import os
import json

import googleapiclient.discovery
import googleapiclient.errors

developerKey = ""
api_service_name = "youtube"
api_version = "v3"

current_file_path = os.path.dirname(__file__)
secret_file = os.path.join(current_file_path, "../config/secret.json")


def get_youtube_play_info(query):
    with open(secret_file) as json_data:
        developerKey = json.load(json_data)['key']

    print("Query: '%s', this is expensive" % query)

    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    # Get credentials and create an API client
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=developerKey)

    request = youtube.search().list(
        part="snippet",
        maxResults=1,
        q=query
    )
    response = request.execute()

    return response
