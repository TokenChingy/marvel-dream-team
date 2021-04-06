import React, {useState} from 'react';

import {Card, CardActionArea, CardContent, CardMedia, makeStyles, Slide, Theme, Typography} from '@material-ui/core';

import {IMarvelCharacter} from '../../Utilities/Marvel';
import CharacterModal from './CharacterModal';

export interface ICharacterCardProps {
  character: IMarvelCharacter;
}

const useStyles = makeStyles(function (theme: Theme) {
  return {
    card: {
      '&:hover': {
        opacity: '1'
      },
      width: 256,
      height: 256,
      background: '#ED1D24',
      opacity: '0.75'
    },
    media: {
      height: 192,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom'
    },
    title: {
      width: '100%',
      fontFamily: 'Bangers',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#FFFFFF'
    }
  };
});

export default function CharacterCard(props: ICharacterCardProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const classes = useStyles();

  const {character} = props;

  const image = `${character.thumbnail?.path}.${character.thumbnail?.extension}`;

  return (
    <React.Fragment>
      <Slide direction={'up'} in>
        <Card className={classes.card}>
          <CardActionArea onClick={() => setShowModal(!showModal)}>
            <CardMedia image={image} title={character.name} className={classes.media} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.title}>
                {props.character.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Slide>
      <CharacterModal
        character={character}
        show={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
    </React.Fragment>
  );
}
