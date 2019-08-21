import { IIframeProps } from "components/song/Iframe";
import React from "react";
import { Grid } from "semantic-ui-react";
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";
import {getMoreSongs, IJsonSong, playRandomSong} from "../../utils";
import { Song } from "./Song";

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
        const randomSong = playRandomSong();

        this.props.onSongClick({
            title: `${randomSong.artist} - ${randomSong.song}`,
            url: randomSong.url,
            youtube: randomSong.youtube,
        });
    }

    public addMoreSongs = () => {
        this.setState({
            songs: this.state.songs.concat(getMoreSongs()),
        });
    }
    public render() {
        return (
            <Grid container centered>
                {this.state.songs.map((song: IJsonSong) => (
                    <Grid.Column mobile={8} tablet={4} computer={4} largeScreen={4} widescreen={2}>
                        <Song key={song.url} click={this.props.onSongClick} {...song}/>
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
