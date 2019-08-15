import React, { useState } from 'react';
import './App.css';
import data from './data.json'
import Song from "./components/song/Song";
import Grid from '@material-ui/core/Grid';
import {useStyles} from './utils/cssUtils';
import LazyLoad from 'react-lazyload';
import Iframe from './components/song/Iframe';

function App() {

  const [state, setState] = useState({
    currentSong: null
  })

  const Loading = () => (
    <p>...</p>
  )

  const onSongClick = (song) => {
    console.log("CLICKED SONG: ", song);
    setState({currentSong: song})
  }

  const classes = useStyles();
  return (
    <div className="App container">
      <div style={{marginBottom: "30px"}}><Iframe {...state.currentSong} ></Iframe></div>
      <div className={classes.root}>
        <Grid	MuiPaper-root container spacing={2} style={{
          "height":"600px",
          "width":"100%",
          "overflow-y":"scroll",
          "overflow-x":"hidden"
          }}>
          <LazyLoad offset={0} height={100} placeholder={<Loading />}>
          {Object.keys(data).map(key => {
            return ( data[key].map(song => (
                <Grid item xs={6} sm={3} md={2}>
                  <LazyLoad once={true}>
                    <Song click={onSongClick} boxShadow={10} {...song}/>
                  </LazyLoad>
                </Grid>
            )))
          })}
          </LazyLoad>
        </Grid>
      </div> 
    </div>
  );
}

export default App;
