import React from 'react';
import './App.css';
import data from './data.json'
import Song from "./components/song/Song";
import Grid from '@material-ui/core/Grid';
import {useStyles} from './utils/cssUtils';
import LazyLoad from 'react-lazyload';

function App() {

  const Loading = () => (
    <p>...</p>
  )

  const classes = useStyles();
  return (
    <div className="App container">
      <div className={classes.root}>
        <Grid	MuiPaper-root container spacing={2}>
          {Object.keys(data).map(key => {
            return ( data[key].map(song => (
              <LazyLoad offset={100} height={500} key={key} placeholder={<Loading />}>
                <Grid item xs={3}>
                  <LazyLoad once={true}>
                    <Song {...song}/>
                  </LazyLoad>
                </Grid>
              </LazyLoad>
            )))
          })}
        </Grid>
      </div> 
    </div>
  );
}

export default App;
