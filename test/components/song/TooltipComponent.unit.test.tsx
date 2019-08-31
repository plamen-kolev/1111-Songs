import React from "react";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {TooltipComponent} from "../../../src/components/song/TooltipComponent";
import {SongType} from "../../../src/components/song/Song";

describe("Tooltip component", () => {

    it("Should show thumbsup", () => {
        let {getByTestId} = render(<TooltipComponent kind={SongType.none} liked={true}/>);
        expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs up");
    });

    it("Should show thumbsdown", () => {
        let {getByTestId } = render(<TooltipComponent kind={SongType.none} liked={false}/>);
        expect(getByTestId("embedded-like-dislike-song")).toHaveClass("thumbs down");
    })
});