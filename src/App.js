import React, { useState } from 'react';
import './App.css';
import { Iframe } from './components/song/Iframe';
import { SongWrapper } from './components/song/SongWrapper';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-89618080-1');

function App() {

  const [state, setState] = useState({
    currentSong: null
  })

  const onSongClick = (song) => {
    setState({currentSong: song})
  }

  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <div className="App container">
      <div className="ui centered grid iframe-container">
        <Iframe {...state.currentSong} />
      </div>
      <SongWrapper key="songWrapper" onSongClick={onSongClick} />
    </div>
  );
}

export default App;
