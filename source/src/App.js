import React, { useState } from 'react';
import './App.css';
import Iframe from './components/song/Iframe';
import { SongWrapper } from './components/song/SongWrapper';

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
    
      <div className="container" style={{
        "height":"600px",
        "width":"100%",
        "overflowY":"scroll",
        "overflowX":"hidden"
        }}>
        <SongWrapper onSongClick={onSongClick} />
      </div>
    </div>
  );
}

export default App;
