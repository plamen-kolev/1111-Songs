import React from 'react';
import './App.css';
import data from './data.json'
import Song from "./components/song/Song";
import Grid from '@material-ui/core/Grid';
import {useStyles} from './utils/cssUtils';
import LazyLoad from 'react-lazyload';
import red from '@material-ui/core/colors/red';

function App() {

  const Loading = () => (
    <p>...</p>
  )

  const classes = useStyles();
  return (
    <div className="App container">
      <div className={classes.root}>
        <Grid	MuiPaper-root container spacing={2}>
          <LazyLoad offset={0} height={100} placeholder={<Loading />}>
          {Object.keys(data).map(key => {
            return ( data[key].map(song => (
                <Grid item xs={6} sm={3} md={2} lg={1}>
                  <LazyLoad once={true}>
                    <Song boxShadow={10} {...song}/>
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
