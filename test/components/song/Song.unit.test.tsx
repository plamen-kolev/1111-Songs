import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Song } from '../../../src/components/song/Song';
import { ISongProps } from "../../../src/components/song/Song";

let fakeClick = jest.fn
let enrichedSong: ISongProps;

describe("song", () => {
    
    beforeEach(() => {
        enrichedSong = {
            enriched: true,
            artist: "The Shogun Smiths",
            song: "Hammering all day",
            url: "soundsofmetal.com",
            genre: "Perfect clinging",
            click: fakeClick
        }
    })
    it("should sing", () => {
        const { getByText, getByTestId } = render(<Song {...enrichedSong}/>);
    });
});