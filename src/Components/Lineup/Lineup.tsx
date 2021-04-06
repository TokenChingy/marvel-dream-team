import React, {Dispatch, useContext, useEffect, useState} from 'react';

import {Grid, makeStyles} from '@material-ui/core';
import CharacterCard from './CharacterCard';

import {Context, IAction, IState} from '../../Utilities/Store';
import {IMarvelCharacter} from '../../Utilities/Marvel';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%'
  }
}));

export default function Lineup() {
  const [cards, setCards] = useState<IMarvelCharacter[]>([]);
  const [{lineup, lineupCount}] = useContext<[IState, Dispatch<IAction>]>(Context);

  const classes = useStyles();

  useEffect(
    function () {
      const characters: IMarvelCharacter[] = [];

      lineup.forEach(function (character: IMarvelCharacter) {
        characters.push(character);
      });

      setCards(characters);
    },
    [lineup, lineupCount]
  );

  return (
    <Grid container justify={'center'} spacing={4} className={classes.container}>
      {cards.map(function (character: IMarvelCharacter) {
        return (
          <Grid item key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        );
      })}
    </Grid>
  );
}
