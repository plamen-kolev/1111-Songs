import json
import unittest
from unittest import TestCase
from src.programs.enrich_with_youtube import main
from unittest.mock import patch

realJsonData = {}
with open('../../data/data.json') as json_data:
    realJsonData = json.load(json_data)


class TestEnrich(TestCase):

    # purpose of this test is to see that all entries exist and that the last and first entries exist
    @unittest.mock.patch("src.programs.enrich_with_youtube.enrich")
    def test_foo(self, mock_enrich):
        main(realJsonData)

        self.assertEqual(1111, mock_enrich.call_count)
        self.assertEqual(realJsonData['entries']['Prehistoric'][0], mock_enrich.call_args_list[0][0][0])
        self.assertEqual(realJsonData['entries']['Sumerian '][0], mock_enrich.call_args_list[1][0][0])
        self.assertEqual(realJsonData['entries']['Animal Music '][0], mock_enrich.call_args_list[1110][0][0])
