import {getMoreSongs, getRandomSong, IJsonSong} from "../../src/utils";
import {SongType} from "../../src/components/song/Song";

describe("SongUtilities", () => {
    const songs: IJsonSong[] = [{
        id: 984,
        genre: "Hardcore Polka ",
        title: "Heavy Voichek - Blasting the polka",
        url: "https://www.youtube.com/results?search_query=Sunship-Is%20This%20Real",
        kind: SongType.none
    }, {
        id: 985,
        genre: "Heavy Opera ",
        title: "Marie the Heavy - Bassdroppers are voicedroppers",
        url: "https://www.youtube.com/results?search_query=Sunship-Is%20This%20Real",
        kind: SongType.none
    }, {
        id: 986,
        genre: "Sidewalk Musique",
        title: "Freeway Mike - I roam alone",
        url: "https://www.youtube.com/results?search_query=Sunship-Is%20This%20Real",
        kind: SongType.none
    }];

    const mockMath = Object.create(global.Math);
    global.Math = mockMath;

    beforeEach(() => {

        // @ts-ignore
        global.Math = mockMath
    });

    describe("when get random song is called", () => {
        describe("when no songs passed", () => {
            it("should not return a song", () => {
                const song: IJsonSong | {} = getRandomSong([]);
                expect(song).toEqual({});
            });
        });

        describe("when songs passed", () => {
            it("should return a random song when options provided", () => {
                mockMath.random = () => 0.5;
                const song1: any = getRandomSong(songs);
                expect(song1 && song1.title).toEqual("Marie the Heavy - Bassdroppers are voicedroppers");

                mockMath.random = () => 0.1;
                const song2:any  = getRandomSong(songs);
                expect(song2.title).toEqual("Heavy Voichek - Blasting the polka");
            })
        })
    });

    describe("when load more songs is called", () => {
        const songsToLoad = 2;

        describe("with no arguments", () => {
            it("should return empty array", () => {
                const songs = getMoreSongs([], songsToLoad);
                expect(songs.length).toEqual(0);
            });

            it("should get a chunk of songs from the list and the genre list should have less entries", () => {
                const s = getMoreSongs(songs, songsToLoad);
                expect(s.map(song => song.title))
                    .toEqual(expect.arrayContaining(["Freeway Mike - I roam alone", "Marie the Heavy - Bassdroppers are voicedroppers"]));
                expect(songs.length).toEqual(1);
                expect(songs[0].title).toEqual("Heavy Voichek - Blasting the polka");
            })
        })
    });
});