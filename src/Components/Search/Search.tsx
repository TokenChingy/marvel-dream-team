import React, {Dispatch, useCallback, useContext, useEffect, useState} from 'react';
import {debounce} from 'lodash';

import {Box, Button, Container, Grid, makeStyles, TextField, Theme} from '@material-ui/core';
import {Autocomplete, AutocompleteRenderInputParams} from '@material-ui/lab';

import {getCharacters, IMarvelCharacter} from '../../Utilities/Marvel';
import {Context, IAction, IState} from '../../Utilities/Store';

const useStyles = makeStyles(function (theme: Theme) {
  return {
    textField: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      borderRadius: '4px',
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.complex
      })
    },
    autoComplete: {
      '&.MuiAutocomplete-root.Mui-focused .MuiTextField-root': {
        backgroundColor: theme.palette.common.white
      }
    },
    button: {
      fontFamily: 'Bangers'
    }
  };
});

/**
 * @description React component to provide a search bar for Marvel characters.
 * @constructor
 */
export default function Search(): JSX.Element {
  const [characters, setCharacters] = useState<IMarvelCharacter[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [{lineupCount}, dispatch] = useContext<[IState, Dispatch<IAction>]>(Context);

  const classes = useStyles();

  // NOTE: It's okay to ignore this stale closure.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(function (value: string) {
      setSearchTerm(value);
    }, 250),
    []
  );

  const handleAdd = function () {
    const selectedCharacter = characters.find(function (character: IMarvelCharacter) {
      return character.name?.toLowerCase() === searchTerm.toLowerCase();
    });

    if (selectedCharacter) {
      dispatch({
        type: 'ADD_CHARACTER',
        data: selectedCharacter
      });
    }
  };

  useEffect(
    function () {
      (async function () {
        const retrieved = await getCharacters(searchTerm);

        setCharacters(retrieved);
      })();
    },
    [searchTerm]
  );

  return (
    <Container maxWidth={'md'}>
      <Box m={2}>
        <Grid container spacing={2} direction={'row'} justify={'center'} alignItems={'center'}>
          <Grid item sm={10} xs={12}>
            <Autocomplete
              freeSolo
              disableClearable
              disabled={lineupCount >= 5}
              onInputChange={(_, value: string) => handleSearch(value)}
              options={
                characters.length
                  ? characters.map(function (option: IMarvelCharacter) {
                      return option.name;
                    })
                  : []
              }
              renderInput={function (params: AutocompleteRenderInputParams): JSX.Element {
                return (
                  <TextField
                    {...params}
                    label={'Find your Marvel characters!'}
                    variant={'filled'}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search'
                    }}
                    className={classes.textField}
                  />
                );
              }}
              className={classes.autoComplete}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <Button
              onClick={handleAdd}
              variant={'contained'}
              color={'primary'}
              size={'large'}
              fullWidth
              disabled={lineupCount >= 5}
              className={classes.button}>
              Choose {5 - lineupCount}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
