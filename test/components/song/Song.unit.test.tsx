import React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import {ISongProps, Song, SongType} from '../../../src/components/song/Song';

const fakeClick = jest.fn();
const fakeSetActive = jest.fn();
let song: ISongProps;

describe("song", () => {

    beforeEach(() => {
        cleanup();
        song = {
            id: 1,
            title: "The Shogun Smiths - Hammering all day",
            url: "soundsofmetal.com",
            genre: "Perfect clinging",
            click: fakeClick,
            setActiveSong: fakeSetActive,
            kind: SongType.none,
            active: false
        }
    });

    describe("when clicking on a song", () => {
        it("should invoke callback", () => {
            const { getByText } = render(
                <Song {...song}/>
            );
            fireEvent.click(getByText(song.title));
            expect(fakeClick).toHaveBeenCalled();
        })
    });

    describe("which is not enriched", () => {

        it("should render with default title", () => {
            const { getByText, getByTestId, queryByText } = render(
                <Song {...song}/>
            );
            expect(getByText(song.title))
        });

        it("should have an icon with tooltip 'not embedded'", () => {

            const { getByText, getByTestId, queryByText } = render(
                <Song {...song}/>
            );
            fireEvent.click(getByTestId("not-embedded-song-tooltip"));
            expect(getByText("This song is not embedded")).toBeDefined();
        })

    });

    describe("which is enriched", () => {

        it("should render with video item", () => {

            // sets it to video and not to playlist
            song.kind = SongType.song;
            const { getByText, getByTestId, queryByText } = render(
                <Song {...song}/>
            );
            expect(getByText(song.title)).toBeDefined();
            expect(getByText(song.genre)).toBeDefined();

            // because it is enriched and is of type video
            fireEvent.click(getByTestId("embedded-song"));
            expect(getByText("This song is embedded")).toBeDefined();
            expect(queryByText("not-embedded-song-tooltip")).toEqual(null);
        });

        it("should render with playlist item", () => {

            // arrange
            song.kind = SongType.playlist;;

            // act
            const { getByText, getByTestId } = render(
                <Song {...song}/>
            );

            // assert
            expect(getByText(song.title)).toBeDefined();
            expect(getByText(song.genre)).toBeDefined();

            // because it is enriched and is of type video
            fireEvent.click(getByTestId("embedded-song"));
            expect(getByText("This song is embedded")).toBeDefined();
        });
    });

    describe("Clicking like/dislike button", () => {
        it("clicking like button should set state on the button", () => {
            const { getByTestId } = render(
                <Song {...song}/>
            );

            fireEvent.click(getByTestId("like-button"));
            expect(getByTestId('like-button')).not.toHaveClass("basic");
        });

        it("clicking dislike button should set state on the button", () => {
            const { getByTestId } = render(
                <Song {...song}/>
            );

            fireEvent.click(getByTestId("dislike-button"));
            expect(getByTestId('dislike-button')).not.toHaveClass("basic");
        });

        it("disliking a liked song should dislike it", () => {
            // arrange
            const { getByTestId } = render(
                <Song {...{...song, liked: true}}/>
            );

            expect(getByTestId('like-button')).not.toHaveClass("basic");
            expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs up");

            // act
            fireEvent.click(getByTestId("dislike-button"));

            // assert
            expect(getByTestId('like-button')).toHaveClass("basic");
            expect(getByTestId('dislike-button')).not.toHaveClass("basic");
            expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs down");
        });

        it("liking a disliked song should like it", () => {
            // arrange
            const { getByTestId } = render(
                <Song {...{...song, liked: false}}/>
            );

            expect(getByTestId('dislike-button')).not.toHaveClass("basic");
            expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs down");

            // act
            fireEvent.click(getByTestId("like-button"));

            // assert
            expect(getByTestId('dislike-button')).toHaveClass("basic");
            expect(getByTestId('like-button')).not.toHaveClass("basic");
            expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs up");
        });

        it("liking a liked song should default it", () => {
            // arrange
            const { getByTestId } = render(
                <Song {...{...song, liked: true}}/>
            );

            expect(getByTestId('like-button')).not.toHaveClass("basic");

            // act
            fireEvent.click(getByTestId("like-button"));

            // assert
            expect(getByTestId('like-button')).toHaveClass("basic");
            expect(getByTestId('dislike-button')).toHaveClass("basic");

        });

        it("disliking a disliked song should default it", () => {
            // arrange
            const { getByTestId } = render(
                <Song {...{...song, liked: false}}/>
            );

            expect(getByTestId('dislike-button')).not.toHaveClass("basic");

            // act
            fireEvent.click(getByTestId("dislike-button"));

            // assert
            expect(getByTestId('like-button')).toHaveClass("basic");
            expect(getByTestId('dislike-button')).toHaveClass("basic");
        });
    })
});