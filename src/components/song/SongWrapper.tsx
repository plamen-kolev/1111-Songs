import { IIframeProps } from "components/song/IframeComponent";
import React from "react";
import LazyLoad from "react-lazyload";
import {Grid, VisibilityEventData} from "semantic-ui-react";
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";
import genresList from "../../data/categories_lookup.json";
import {getMoreSongs, IJsonSong} from "../../utils";
import {getAll} from "../../utils/localStorage";
import { Song } from "./Song";
import {SongLoading} from "./SongLoading";

const likedSongs = getAll();

const CHUNKS_TO_LOAD_ON_SCROLL = 64;
const INITIAL_CHUNKS_TO_LOAD = 124;

interface ISongWrapperProps {
    onSongClick(iframeData: IIframeProps): void;
}

export class SongWrapper extends React.Component<ISongWrapperProps, { songs: IJsonSong[] }> {
    constructor(props: ISongWrapperProps, state: any) {
        super(props, state);
        this.state = {
            songs: getMoreSongs(genresList, INITIAL_CHUNKS_TO_LOAD),
        };
    }

    public shouldComponentUpdate(
        nextProps: Readonly<ISongWrapperProps>,
        nextState: Readonly<{ songs: IJsonSong[] }>,
        nextContext: any): boolean {
        return !(this.state.songs === nextState.songs);
    }

    public render() {
        return (
            <Visibility
                continuous={true}
                once={true}
                onUpdate={(nothing, data) => this.shouldLoadMoreSongs(nothing, data)}
            >
                <Grid padded centered>
                    {this.state.songs.map((song: IJsonSong) => (
                        <Grid.Column className="song-column-item"
                                     key={song.url}
                                     mobile={8}
                                     tablet={4}
                                     computer={3}
                                     largeScreen={3}
                                     widescreen={2}>
                            <LazyLoad once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
                                <Song click={this.props.onSongClick}
                                      { ...{...song, liked: likedSongs[song.unique_id] &&
                                              likedSongs[song.unique_id].liked}}
                                />
                            </LazyLoad>
                        </Grid.Column>
                    ))}

                </Grid>
            </Visibility>

        ); }

    private shouldLoadMoreSongs(nothing: null, {calculations}: VisibilityEventData): void {
        if (calculations.height - calculations.pixelsPassed < 2000) {
            this.addMoreSongs();
        }
    }

    private addMoreSongs = () => {
        this.setState({
            songs: this.state.songs.concat(getMoreSongs(genresList, CHUNKS_TO_LOAD_ON_SCROLL)),
        });
    }
}
