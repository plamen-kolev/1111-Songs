import {save, getAll, SONG_DATA_KEY, IUserInteraction, IUserPreferences} from '../../src/utils/localStorage';
import {ISongProps} from "../../src/components/song/Song";

describe("Localstorage", () => {
    const songName = 1;
    const entry: IUserInteraction = {id: songName, liked: true};

    let spyOnSetItem: jasmine.Spy;
    let spyOnGettingItem: jasmine.Spy;

    beforeEach(() => {
        localStorage.clear();
        spyOnSetItem = spyOn(Storage.prototype, 'setItem');
        spyOnGettingItem = spyOn(Storage.prototype, 'getItem');
    });

    it("should be able to save data", () => {
        // act
        save(entry);

        // assert
        expect(spyOnSetItem).toHaveBeenCalledWith(SONG_DATA_KEY, new Buffer(JSON.stringify({
            [songName]: entry
        })).toString("base64"));
    });

    it("should be able to retrieve data", () => {
        // act
        getAll();

        // assert
        expect(spyOnGettingItem).toHaveBeenCalledWith(SONG_DATA_KEY);
    });

    it("should append to the user data when new entry added", () => {
        // arrange
        const singleEntry = new Buffer(JSON.stringify({
            [songName]: entry
        })).toString("base64");
        const secondEntry: IUserInteraction = {id: 1, liked: false}
        spyOnGettingItem.and.returnValue(singleEntry);

        // act
        save(secondEntry);

        // assert
        expect(spyOnSetItem).toHaveBeenCalledWith(SONG_DATA_KEY, new Buffer(JSON.stringify({
            [songName]: entry,
            [secondEntry.id]: secondEntry
        })).toString("base64"));
    })
});