import json
import os
import unittest
from unittest import TestCase
from unittest.mock import patch
from src.youtube.songEnricher import enrich_song


mock_youtube_response_path = os.path.join(os.path.dirname(__file__), "../../data/youtubeResponse.json")
mock_youtube_json = {}

with open(mock_youtube_response_path) as json_data:
    mock_youtube_json = json.load(json_data)


@unittest.mock.patch("src.youtube.youtube_service.get_youtube_play_info", return_value=mock_youtube_json)
class TestEnrichSong(TestCase):
    song_json = {
        "unique_id": 1093,
        "genre": "Speeches ",
        "artist": "Various",
        "song": "Great Speeches of the 20th Century",
        "year": "(2007)",
        "url": "https://www.youtube.com/results?search_query=Various-Great%20Speeches%20of%20the%2020th%20Century"
    }

    def test_returns_enriched_song_with_youtube_data(self, mock_youtube_play_info):
        song = enrich_song(self.song_json)
        self.assertEqual(song['youtube'], mock_youtube_json['items'][0])
        self.assertTrue(song['enriched'])

    def test_returns_passed_data_back(self, mock_youtube_play_info):
        song = enrich_song(self.song_json)

        self.assertEqual(song['unique_id'], self.song_json['unique_id'])
        self.assertEqual(song['url'], self.song_json['url'])
        self.assertEqual(song['artist'], self.song_json['artist'])
        self.assertEqual(song['song'], self.song_json['song'])

        self.assertTrue(song['enriched'])
