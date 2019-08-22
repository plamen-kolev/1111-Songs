import {IJsonSong, IYoutubeInterface, getRandomSong, getMoreSongs} from "../../src/utils";

describe("SongUtilities", () => {

    let genres: Array<string>;
    const mockMath = Object.create(global.Math);
    global.Math = mockMath;

    beforeEach(() => {
        genres = ['Power_Metal', 'Progressive_Metal', 'Djent'];
        // @ts-ignore
        global.Math = mockMath
    });

    describe("when get random song is called", () => {
        describe("when no songs passed", () => {
            it("should not return a song", () => {
                const song: IJsonSong = getRandomSong([]);
                expect(song).toEqual({});
            });
        });

        describe("when songs passed", () => {
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

    describe("when load more songs is called", () => {
        const songsToLoad = 2;
        const songs: IJsonSong[] = [{
            unique_id: "984",
            genre: "Hardcore Polka ",
            artist: "Heavy Voichek",
            song: "Blasting the polka",
            year: "(1998)",
            url: "https://www.youtube.com/results?search_query=Sunship-Is%20This%20Real",
            enriched: false
        }, {
            unique_id: "984",
            genre: "Heavy Opera ",
            artist: "Marie the Heavy",
            song: "Bassdroppers are voicedroppers",
            year: "(1998)",
            url: "https://www.youtube.com/results?search_query=Sunship-Is%20This%20Real",
            enriched: false
        }, {
            unique_id: "984",
            genre: "Sidewalk Musique",
            artist: "Freeway Mike",
            song: "I roam alone",
            year: "(1998)",
            url: "https://www.youtube.com/results?search_query=Sunship-Is%20This%20Real",
            enriched: false
        }];
        describe("with no arguments", () => {
            it("should return empty array", () => {
                const songs = getMoreSongs([], songsToLoad);
                expect(songs.length).toEqual(0);
            });

            it("should get a chunk of songs from the list and the genre list should have less entries", () => {
                const songs = getMoreSongs(genres, songsToLoad);
                expect(songs.map(song => song.song))
                    .toEqual(expect.arrayContaining(["Destroy Erase Improve", "The Spectre Within"]));
                expect(genres.length).toEqual(1);
                expect(genres[0]).toEqual("Power_Metal");
            })
        })
    });
});