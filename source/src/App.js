import React from 'react';
import './App.css';
import data from './data.json'
import Genre from "./components/genre/Genre";

function App() {
  return (
    <div className="App">
      {Object.keys(data).map(key => 
        <Genre key={key} title={key} songs={data[key]}/>
      )}    
    </div>
  );
}

export default App;
