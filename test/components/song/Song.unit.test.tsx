import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Song } from '../../../src/components/song/Song';
import { ISongProps } from "../../../src/components/song/Song";

let fakeClick = jest.fn();
let enrichedSongWithVideoSong: ISongProps;

describe("song", () => {
    
    beforeEach(() => {
        enrichedSongWithVideoSong = {
            enriched: true,
            artist: "The Shogun Smiths",
            song: "Hammering all day",
            url: "soundsofmetal.com",
            genre: "Perfect clinging",
            click: fakeClick,
            youtube: {
                id: {
                    kind: "youtube#video"
                },
                snippet: {
                    title: "title"
                }
            }
        }
    })
    it("should render enriched song item", () => {
        const { getByText, getByTestId, queryByText } = render(
            <Song {...enrichedSongWithVideoSong}/>
        );
        // @ts-ignore
        expect(getByText(enrichedSongWithVideoSong.youtube.snippet.title)).toBeDefined();
        expect(getByText(enrichedSongWithVideoSong.genre)).toBeDefined();

        // because it is enriched and is of type video
        fireEvent.click(getByTestId("embedded-song"));
        expect(getByText("This song is embedded")).toBeDefined();
        expect(queryByText("not-embedded-song-tooltip")).toEqual(null);

    });
});