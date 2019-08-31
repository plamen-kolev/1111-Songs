import { IIframeProps } from "components/song/IframeComponent";
import React from "react";
import LazyLoad from "react-lazyload";
import {Grid, VisibilityEventData} from "semantic-ui-react";
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";
import genresList from "../../data/simplified.json";
import {getMoreSongs, IJsonSong} from "../../utils";
import {getAll} from "../../utils/localStorage";
import { Song } from "./Song";
import {SongLoading} from "./SongLoading";

const songPreferences = getAll();
const list: IJsonSong[] = [];

const CHUNKS_TO_LOAD_ON_SCROLL = 64;
const INITIAL_CHUNKS_TO_LOAD = 124;

interface ISongWrapperProps {
    onSongClick(iframeData: IIframeProps): void;
}

interface ISongWrapperState {
    songs: IJsonSong[];
    activeSong: undefined | number;
}

export class SongWrapper extends React.Component<ISongWrapperProps, ISongWrapperState> {
    constructor(props: ISongWrapperProps, state: any) {
        super(props, state);
        Object.assign(list, genresList);
        this.state = {
            activeSong: undefined,
            songs: getMoreSongs(list, INITIAL_CHUNKS_TO_LOAD),
        };
    }

    public shouldComponentUpdate(
        nextProps: Readonly<ISongWrapperProps>,
        nextState: Readonly<ISongWrapperState>,
        nextContext: any): boolean {
        return !(this.state.songs === nextState.songs && this.state.activeSong === nextState.activeSong);
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
                        <Grid.Column
                            className="song-column-item"
                            data-testid="song-column-item"
                            key={song.url}
                            mobile={8}
                            tablet={4}
                            computer={3}
                            largeScreen={3}
                            widescreen={2}>
                            <LazyLoad once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
                                <Song active={this.state.activeSong === song.id}
                                      setActiveSong={this.setActiveSong} click={this.props.onSongClick}
                                      { ...{...song,
                                          liked: songPreferences[song.id] && songPreferences[song.id].liked,
                                      }
                                      }
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
            songs: this.state.songs.concat(getMoreSongs(list, CHUNKS_TO_LOAD_ON_SCROLL)),
        });
    }

    private setActiveSong = (id: number) => {
        this.setState({
            activeSong: id,
    });
    }
}
