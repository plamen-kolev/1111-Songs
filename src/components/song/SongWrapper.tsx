import { IIframeProps } from "components/song/Iframe";
import React from "react";
import LazyLoad from "react-lazyload";
import { Grid } from "semantic-ui-react";
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";
import genresList from "../../data/categories_lookup.json";
import {getMoreSongs, IJsonSong} from "../../utils";
import { Song } from "./Song";
import {SongLoading} from "./SongLoading";

const CHUNKS_TO_LOAD = 32;

genresList.sort(() => Math.random() - 0.5);

interface ISongWrapperProps {
    onSongClick(iframeData: IIframeProps): void;
}

export class SongWrapper extends React.Component<ISongWrapperProps, { songs: IJsonSong[] }> {
    constructor(props: ISongWrapperProps, state: any) {
        super(props, state);
        this.state = {
            songs: [],
        };
    }

    public shouldComponentUpdate(
        nextProps: Readonly<ISongWrapperProps>,
        nextState: Readonly<{ songs: IJsonSong[] }>,
        nextContext: any): boolean {
        return !(this.state.songs === nextState.songs);
    }

    public componentDidMount(): void {
        this.addMoreSongs();
    }

    public addMoreSongs = () => {
        this.setState({
            songs: this.state.songs.concat(getMoreSongs(genresList, CHUNKS_TO_LOAD)),
        });
    }
    public render() {
        return (
            <Visibility
                continuous={true}
                once={true}
                // onBottomVisible={() => this.addMoreSongs()}
                onUpdate={(e, {calculations}) => {
                    if(calculations.height - calculations.pixelsPassed < 2000) {
                        this.addMoreSongs()
                    }
                }}
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
                            <Song click={this.props.onSongClick} {...song}/>
                        </LazyLoad>
                    </Grid.Column>
                ))}


            </Grid>
            </Visibility>

        ); }
}