import {save, getAll, SONG_DATA_KEY, IUserInteraction, IUserPreferences} from '../../src/utils/localStorage';

describe("Localstorage", () => {
    const songName = "BASE OF PACE";
    const entry: IUserInteraction = {unique_id: songName, liked: true};

    let spyOnSetItem = () => {};
    let spyOnGettingItem = () => {};

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
        const data: IUserPreferences = getAll();

        // assert
        expect(spyOnGettingItem).toHaveBeenCalledWith(SONG_DATA_KEY);
    });
});