import json

fakeResponse = {}
with open('json/youtubeResponse.json') as json_data:
    fakeResponse = json.load(json_data)


def getYoutubePlayInfo(query):
        return fakeResponse
