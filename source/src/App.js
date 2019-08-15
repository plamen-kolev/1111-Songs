import React, { useState } from 'react';
import './App.css';
import data from './data.json'
import Song from "./components/song/Song";
import Iframe from './components/song/Iframe';
import { Grid } from 'semantic-ui-react'
function App() {

  const [state, setState] = useState({
    currentSong: null
  })

  const onSongClick = (song) => {
    setState({currentSong: song})
  }
  return (
    <div className="App container">
      <div style={{marginBottom: "30px"}}><Iframe {...state.currentSong} ></Iframe></div>
    
      <Grid class="container" style={{
        "height":"600px",
        "width":"100%",
        "overflow-y":"scroll",
        "overflow-x":"hidden"
        }}>
        {Object.keys(data).map(key => {
          return ( data[key].map(song => (
            <Grid.Column mobile={6} tablet={3} computer={2}>
              <Song click={onSongClick} boxShadow={10} {...song}/>
            </Grid.Column>
          )))
        })}
      </Grid>
    </div>
  );
}

export default App;
