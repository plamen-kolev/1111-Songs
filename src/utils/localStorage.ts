const SONG_DATA_KEY = "SONGS_DATA";

export interface ILikedData {
    [key: string]: boolean;
}

export const getAll = () => {
    return localstoreEntriesAsJson();
};

export const save = (song: any) => {
    const entries = localstoreEntriesAsJson();
    // @ts-ignore
    entries[song.unique_id] = {liked: song.liked};
    writeUpdate(entries);

};

const localstoreEntriesAsJson = () => {
    const results: string = localStorage.getItem(SONG_DATA_KEY) || "e30=";
    return JSON.parse(new Buffer(results, "base64").toString("ascii"));
};

const writeUpdate = (jsonEntities: any) => {
    const dataToSave = new Buffer(JSON.stringify(jsonEntities)).toString("base64");
    localStorage.setItem(SONG_DATA_KEY, dataToSave);
};
