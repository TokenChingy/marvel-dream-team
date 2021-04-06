import React from 'react';

import {makeStyles, Paper, Theme, Toolbar, Typography} from '@material-ui/core';

import {ReactComponent as MarvelLogo} from './MarvelLogo.svg';

const useStyles = makeStyles(function (theme: Theme) {
  return {
    primaryToolbar: {
      backgroundColor: '#202020'
    },
    primaryToolbarLogo: {
      flex: 1,
      margin: 0,
      padding: 0,
      height: '52px'
    },
    secondaryToolbar: {
      justifyContent: 'space-between',
      overFlowX: 'auto',
      backgroundColor: '#151515'
    },
    secondaryToolbarTitle: {
      flex: 1,
      margin: 0,
      padding: 0,
      color: theme.palette.common.white,
      fontFamily: 'Bangers',
      textTransform: 'uppercase'
    }
  };
});

/**
 * @description React component for rendering the Marvel Dream Team header toolbars.
 * @constructor
 */
export default function Header(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={8}>
      <Toolbar variant={'dense'} className={classes.primaryToolbar}>
        <MarvelLogo className={classes.primaryToolbarLogo} />
      </Toolbar>
      <Toolbar variant={'dense'} component={'nav'} className={classes.secondaryToolbar}>
        <Typography
          variant={'h5'}
          component={'h1'}
          align={'center'}
          paragraph={false}
          gutterBottom={false}
          noWrap
          className={classes.secondaryToolbarTitle}>
          Dream Team
        </Typography>
      </Toolbar>
    </Paper>
  );
}
