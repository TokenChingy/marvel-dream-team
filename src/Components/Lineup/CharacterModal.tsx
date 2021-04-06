import React, {Dispatch, useContext} from 'react';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  makeStyles,
  Theme,
  DialogTitleProps
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {Close} from '@material-ui/icons';

import {IMarvelCharacter} from '../../Utilities/Marvel';
import {Context, IAction, IState} from '../../Utilities/Store';

export interface ICharacterModalProps {
  character: IMarvelCharacter;
  closeModal: () => void;
  show: boolean;
}

const useStyles = makeStyles(function (theme: Theme) {
  return {
    dialogTitle: {
      margin: 0,
      padding: theme.spacing(2)
    },
    dialogContent: {
      margin: 0,
      padding: theme.spacing(2)
    },
    dialogActions: {
      margin: 0,
      padding: theme.spacing(2),
      fontFamily: 'Bangers'
    },
    title: {
      fontFamily: 'Bangers'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
    removeButton: {
      fontFamily: 'Bangers'
    }
  };
});

export interface IDialogTitleProps extends DialogTitleProps {
  onClose: () => void;
}

export function DialogTitle(props: IDialogTitleProps) {
  const {children, onClose, ...other} = props;

  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.dialogTitle} {...other}>
      <Typography variant="h4" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default function CharacterModal(props: ICharacterModalProps): JSX.Element {
  const {character, show, closeModal} = props;
  const [, dispatch] = useContext<[IState, Dispatch<IAction>]>(Context);

  const classes = useStyles();

  function handleRemove() {
    dispatch({
      type: 'REMOVE_CHARACTER',
      data: character.id
    });

    closeModal();
  }

  return (
    <Dialog open={show} maxWidth={'md'} onBackdropClick={closeModal}>
      <DialogTitle onClose={closeModal}>{character.name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {character.description !== '' ? character.description : 'This character does not have a story...'}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="secondary" onClick={handleRemove} className={classes.removeButton}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
