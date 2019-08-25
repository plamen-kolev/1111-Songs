import {render, fireEvent, cleanup, GetByBoundAttribute} from '@testing-library/react'
import {LikeDislikeComponent} from "../../../src/components/song/LikeDislikeComponent";
import React from "react";
import '@testing-library/jest-dom/extend-expect'

beforeEach(() => {
    cleanup();
});

describe("LikeDislike component", () => {
    let mockSetLiked = jest.fn();
    let getByTestId: any;
    let debug;

    describe("when interacting for the first time", () => {
        beforeEach(() => {
            const renderer = render(
                <LikeDislikeComponent liked={undefined} unique_id={"unique"} setLiked={mockSetLiked} />
            );
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


    it("when liked green button should be selected",() => {
        const {getByTestId} = render(
            <LikeDislikeComponent liked={true} unique_id={"unique"} setLiked={mockSetLiked} />
        );
        expect(getByTestId("like-button")).not.toHaveClass("basic");
    });

    it("when liked red button should be selected",() => {
        const {getByTestId} = render(
            <LikeDislikeComponent liked={false} unique_id={"unique"} setLiked={mockSetLiked} />
        );
        expect(getByTestId("dislike-button")).not.toHaveClass("basic");
    });
});