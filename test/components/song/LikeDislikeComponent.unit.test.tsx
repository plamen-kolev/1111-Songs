import {render, fireEvent, cleanup, GetByBoundAttribute} from '@testing-library/react'
import {LikeDislikeComponent} from "../../../src/components/song/LikeDislikeComponent";
import React from "react";
import '@testing-library/jest-dom/extend-expect'

describe("LikeDislike component", () => {

    describe("when interacting for the first time", () => {
        let mockSetLiked = jest.fn();
        let getByText;
        let getByTestId: any;
        let debug;

        beforeEach(() => {
            cleanup();
            const renderer = render(
                <LikeDislikeComponent liked={undefined} unique_id={"unique"} setLiked={mockSetLiked} />
            );
            getByText = renderer.getByText;
            getByTestId = renderer.getByTestId;
            debug = renderer.debug;
        });

        it("should have no like or dislike selected", () => {
            expect(getByTestId("like-button")).toHaveClass("green");
            expect(getByTestId("like-button")).toHaveClass("basic");

            expect(getByTestId("dislike-button")).toHaveClass("red");
            expect(getByTestId("dislike-button")).toHaveClass("basic");
        });

        it("should fire dislike and like events", () => {
            fireEvent.click(getByTestId("like-button"));
            expect(mockSetLiked).toHaveBeenCalledWith(true);

            fireEvent.click(getByTestId("dislike-button"));
            expect(mockSetLiked).toHaveBeenCalledWith(false);
        });
    });
});