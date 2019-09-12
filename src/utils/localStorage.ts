export const SONG_DATA_KEY = "SONGS_DATA";

export interface IUserInteraction {
    liked: boolean | undefined;
    id: number;
}

export interface IUserPreferences { [s: string]: IUserInteraction; }

export const getAll = (): IUserPreferences => {
    return localStoreEntriesAsJson();
};

export const save = (song: IUserInteraction): void =>  {
    const entries: IUserPreferences = localStoreEntriesAsJson();

    entries[song.id] = song;
    writeUpdate(entries);
};

const localStoreEntriesAsJson = (): IUserPreferences => {
    const results: string = localStorage.getItem(SONG_DATA_KEY) || "e30=";
    return JSON.parse(new Buffer(results, "base64").toString("ascii"));
};

const writeUpdate = (jsonEntities: IUserPreferences) => {
    const dataToSave = new Buffer(JSON.stringify(jsonEntities)).toString("base64");
    localStorage.setItem(SONG_DATA_KEY, dataToSave);
};
