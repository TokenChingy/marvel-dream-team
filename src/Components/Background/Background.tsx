import React from 'react';

import {makeStyles} from '@material-ui/core';

import MarvelComics from './MarvelComics.jpg';

export interface IBackgroundProps {
  children: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles(function () {
  return {
    background: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${MarvelComics})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        filter: 'grayscale(100%) opacity(0.1) blur(1px)'
      },
      width: '100vw',
      minHeight: '100vh',
      background: 'radial-gradient(circle, rgba(50, 50, 50, 1) 0%, rgba(0, 0, 0, 1) 75%)'
    },
    children: {
      position: 'relative'
    }
  };
});

/**
 * @description React component that provides a the Marvel Comic background. It takes components as children.
 * @param props
 * @constructor
 */
export default function Background(props: IBackgroundProps): JSX.Element {
  const classes = useStyles();

  const {children} = props;

  return (
    <div className={classes.background}>
      <div className={classes.children}>{children}</div>
    </div>
  );
}
