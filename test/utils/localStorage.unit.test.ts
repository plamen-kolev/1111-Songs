import {save, getAll, SONG_DATA_KEY, IUserInteraction, IUserPreferences} from '../../src/utils/localStorage';

describe("Localstorage", () => {
    const songName = "BASE OF PACE";
    const entry: IUserInteraction = {unique_id: songName, liked: true};

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
        const secondEntry = {unique_id: "new", liked: false}
        spyOnGettingItem.and.returnValue(singleEntry);

        // act
        save(secondEntry);

        // assert
        expect(spyOnSetItem).toHaveBeenCalledWith(SONG_DATA_KEY, new Buffer(JSON.stringify({
            [songName]: entry,
            [secondEntry.unique_id]: secondEntry
        })).toString("base64"));
    })
});