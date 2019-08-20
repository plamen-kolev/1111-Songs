import json
import os
import unittest
from unittest import TestCase, mock
from src.programs.add_youtube_links_to_songs import main
from src.programs.add_youtube_links_to_songs import enrich
from unittest.mock import patch

realJsonData = {}
data_path = os.path.join(os.path.dirname(__file__), "../../data/data.json")
with open(data_path) as json_data:
    realJsonData = json.load(json_data)

song_json = realJsonData['entries']['Animal Music'][0]


class TestEnrich(TestCase):

    # purpose of this test is to see that all entries exist and that the last and first entries exist
    @unittest.mock.patch("src.programs.add_youtube_links_to_songs.enrich")
    def test_main_method_is_dispatching(self, mock_enrich):
        totalSongs = 1110
        main(realJsonData)

        self.assertEqual(1110, mock_enrich.call_count)
        self.assertEqual(realJsonData['entries']['Prehistoric'][0], mock_enrich.call_args_list[0][0][0])
        self.assertEqual(realJsonData['entries']['Sumerian'][0], mock_enrich.call_args_list[1][0][0])
        self.assertEqual(realJsonData['entries']['Animal Music'][0], mock_enrich.call_args_list[totalSongs][0][0])
