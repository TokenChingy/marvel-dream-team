import React from 'react';

import {createMuiTheme, CssBaseline, Theme, ThemeProvider} from '@material-ui/core';
import Background from './Components/Background/Background';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Lineup from './Components/Lineup/Lineup';

import {ContextProvider} from './Utilities/Store';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ed1d24'
    }
  }
});

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Background>
          <Header />
          <ContextProvider>
            <Search />
            <Lineup />
          </ContextProvider>
        </Background>
      </ThemeProvider>
    </React.Fragment>
  );
}
