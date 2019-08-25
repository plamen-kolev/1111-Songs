import React from "react";
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {TooltipComponent} from "../../../src/components/song/TooltipComponent";

describe("Tooltip component", () => {

    it("Should show thumbsup", () => {
        let {getByTestId} = render(<TooltipComponent youtube={undefined} liked={true}/>);
        expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs up");
    });

    it("Should show thumbsdown", () => {
        let {getByTestId } = render(<TooltipComponent youtube={undefined} liked={false}/>);
        expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs down");
    })
});