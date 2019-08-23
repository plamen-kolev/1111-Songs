import { IIframeProps } from "components/song/Iframe";
import React from "react";
import LazyLoad from "react-lazyload";
import { Grid } from "semantic-ui-react";
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";
import genresList from "../../data/categories_lookup.json";
import {getMoreSongs, getRandomSong, IJsonSong} from "../../utils";
import { Song } from "./Song";
import {SongLoading} from "./SongLoading";

const CHUNKS_TO_LOAD = 24;

genresList.sort(() => Math.random() - 0.5);
const genresForRandomPlay = genresList;

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

    public playRandomSong = () => {
        const randomSong = getRandomSong(genresList);

        this.props.onSongClick({
            title: `${randomSong.artist} - ${randomSong.song}`,
            url: randomSong.url,
            youtube: randomSong.youtube,
        });
    }

    public addMoreSongs = () => {
        this.setState({
            songs: this.state.songs.concat(getMoreSongs(genresForRandomPlay, CHUNKS_TO_LOAD)),
        });
    }
    public render() {
        return (
            <Grid centered>
                {this.state.songs.map((song: IJsonSong) => (
                    <Grid.Column key={song.url} mobile={8} tablet={4} computer={3} largeScreen={3} widescreen={2}>
                        <LazyLoad overflow once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
                            <Song click={this.props.onSongClick} {...song}/>
                        </LazyLoad>
                    </Grid.Column>
                ))}

                <Visibility
                    continuous={true}
                    onBottomVisible={() => this.addMoreSongs()}
                    offset={-100}
                />
            </Grid>
        ); }
}
