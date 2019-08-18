import json

fakeResponse = {}
with open('data/youtubeResponse.data') as json_data:
    fakeResponse = json.load(json_data)


def getYoutubePlayInfo(query):
        return fakeResponse
