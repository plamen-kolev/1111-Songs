import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Song } from '../../../src/components/song/Song';
import { ISongProps } from "../../../src/components/song/Song";

let fakeClick = jest.fn();
let song: ISongProps;

describe("song", () => {

    beforeEach(() => {
        cleanup();
        song = song = {
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
    });

    describe("when clicking on a song", () => {
        it("should invoke callback", () => {
            const { getByText } = render(
                <Song {...song}/>
            );
            // @ts-ignore
            fireEvent.click(getByText(song.youtube.snippet.title));
            expect(fakeClick).toHaveBeenCalled();
        })
    });

    describe("which is not enriched", () => {

        it("should render with default title", () => {
            song.enriched = false;
            song.youtube = undefined;
            const { getByText, getByTestId, queryByText } = render(
                <Song {...song}/>
            );
            expect(getByText(`${song.artist} - ${song.song}`))
        });

        it("should have an icon with tooltip 'not embedded'", () => {
            song.enriched = false;
            song.youtube = undefined;
            const { getByText, getByTestId, queryByText } = render(
                <Song {...song}/>
            );
            fireEvent.click(getByTestId("not-embedded-song-tooltip"));
            expect(getByText("This song is not embedded")).toBeDefined();
        })

    });

    describe("which is enriched", () => {
        it("should render with video item", () => {
            const { getByText, getByTestId, queryByText } = render(
                <Song {...song}/>
            );
            // @ts-ignore
            expect(getByText(song.youtube.snippet.title)).toBeDefined();
            expect(getByText(song.genre)).toBeDefined();

            // because it is enriched and is of type video
            fireEvent.click(getByTestId("embedded-song"));
            expect(getByText("This song is embedded")).toBeDefined();
            expect(queryByText("not-embedded-song-tooltip")).toEqual(null);
        });

        it("should render with playlist item", () => {
            // arrange
            // @ts-ignore
            song.youtube.id.kind = "youtube#playlist";

            // act
            const { getByText, getByTestId } = render(
                <Song {...song}/>
            );

            // assert
            // @ts-ignore
            expect(getByText(song.youtube.snippet.title)).toBeDefined();
            expect(getByText(song.genre)).toBeDefined();

            // because it is enriched and is of type video
            fireEvent.click(getByTestId("embedded-song"));
            expect(getByText("This song is embedded")).toBeDefined();
        });
    })
});