import json
import os
from unittest import TestCase, mock
from src.youtube.songEnricher import enrich_song

mock_youtube_response_path = os.path.join(os.path.dirname(__file__), "../../data/mock/")

mock_youtube_json = {}
mock_empty_youtube_json = {}

with open(mock_youtube_response_path + 'youtube_response.json') as json_data:
    mock_youtube_json = json.load(json_data)

with open(mock_youtube_response_path + 'youtube_empty_response.json') as json_data:
    mock_empty_youtube_json = json.load(json_data)


@mock.patch("json.dump")
@mock.patch("src.youtube.youtube_service.get_youtube_play_info", return_value=mock_youtube_json)
class TestEnrichSong(TestCase):

    def setUp(self):
        self.song_json = {
            "unique_id": 1093,
            "genre": "Speeches ",
            "artist": "Various",
            "song": "Great Speeches of the 20th Century",
            "year": "(2007)",
            "url": "https://www.youtube.com/results?search_query=Various-Great%20Speeches%20of%20the%2020th%20Century"
        }

    def test_returns_enriched_song_with_youtube_data(self, mock_json_dump, mock_youtube_play_info):
        song = enrich_song(self.song_json)
        self.assertEqual(song['youtube'], mock_youtube_json['items'][0])
        self.assertTrue(song['enriched'])

    def test_returns_passed_data_back(self, mock_youtube_play_info, mock_json_dump):
        song = enrich_song(self.song_json)

        self.assertEqual(song['unique_id'], self.song_json['unique_id'])
        self.assertEqual(song['url'], self.song_json['url'])
        self.assertEqual(song['artist'], self.song_json['artist'])
        self.assertEqual(song['song'], self.song_json['song'])

        self.assertTrue(song['enriched'])

    # when api does not return data, should set enriched to true and youtube data should be missing

    def test_api_not_returning_data(self, mock_youtube_play_info, mock_json_dump):
        mock_youtube_play_info.return_value = mock_empty_youtube_json
        song = enrich_song(self.song_json)

        self.assertTrue(song['enriched'])
        self.assertFalse('youtube' in song)

    def test_api_not_returning_should_send_report_to_errorfile(self, mock_youtube_play_info, mock_json_dump):
        expected_argument = {
            "error": "%s - %s. No results found on youtube" % (self.song_json['artist'], self.song_json['song'])}
        mock_youtube_play_info.return_value = mock_empty_youtube_json

        enrich_song(self.song_json)

        self.assertEqual(1, mock_json_dump.call_count)
        self.assertEqual(expected_argument, mock_json_dump.call_args[0][0])

    def test_will_not_call_youtube_api_if_already_enriched(self, mock_youtube_play_info, mock_json_dump):
        enriched_song = {
            "song": "Rich people hits < this row is a red herring",
            "artist": "Rich Brian < this row is a red herring",
            "enriched": True
        }
        enrich_song(enriched_song)
        self.assertEqual(0, mock_youtube_play_info.call_count)