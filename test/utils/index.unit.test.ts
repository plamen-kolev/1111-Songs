import {playRandomSong} from "../../src/utils";

describe("SongUtilities", () => {
    it("should die", () => {
        playRandomSong([]);
        expect(true).toBe(false);
    })
})