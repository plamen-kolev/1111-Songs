import {IJsonSong, IYoutubeInterface, getRandomSong} from "../../src/utils";

describe("SongUtilities", () => {

    const genres: Array<string> = ['Power_Metal', 'Progressive_Metal', 'Djent'];

    describe("when play random song is called", () => {
        const mockMath = Object.create(global.Math);
        global.Math = mockMath;

        beforeEach(() => {
            // @ts-ignore
            global.Math = mockMath
        });

        describe("when no songs passed", () => {
            it("should not return a song", () => {
                const song: IJsonSong = getRandomSong([]);
                expect(song).toEqual({});
            })

            it("should return a random song when options provided", () => {
                mockMath.random = () => 0.5;
                const song1: IJsonSong = getRandomSong(genres);
                expect(song1.artist).toEqual("Fates Warning");
                expect(song1.song).toEqual("The Spectre Within");

                mockMath.random = () => 0.1;
                const song2: IJsonSong = getRandomSong(genres);
                expect(song2.artist).toEqual("Helloween");
                expect(song2.song).toEqual("Walls of Jericho");
            })
        })
    });
});