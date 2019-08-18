import React, { useState } from 'react';
import './App.css';
import { Iframe } from './components/song/Iframe';
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
      <SongWrapper key="songWrapper" onSongClick={onSongClick} />
    </div>
  );
}

export default App;
