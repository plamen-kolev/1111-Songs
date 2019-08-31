import React from "react";
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import {SongWrapper} from "../../../src/components/song/SongWrapper";

const mockOnClick = jest.fn();

describe("SongWrapper", () => {
    describe("on initial load", () => {
        it("should display default results", () => {
            const {queryAllByTestId} = render(<SongWrapper onSongClick={mockOnClick}/>);
            expect(queryAllByTestId("song-column-item").length).toEqual(124);
            expect(mockOnClick).not.toHaveBeenCalled();
        });

        // can't properly test due to lazyloading
        xit("should trigger event when song clicked", () => {
            const {queryAllByTestId} = render(<SongWrapper onSongClick={mockOnClick}/>);

            fireEvent.click(queryAllByTestId("song-card-clickable")[0]);
            expect(mockOnClick).toHaveBeenCalledWith("");
        });
    })
});