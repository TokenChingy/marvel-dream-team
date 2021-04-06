import React, {createContext, Dispatch, useReducer} from 'react';
import {IMarvelCharacter} from './Marvel';

export interface IState {
  lineup: Map<number, IMarvelCharacter>;
  lineupCount: number;
}

export interface IAction {
  type: string;
  data: unknown;
}

export interface IProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const initialState: IState = {
  lineup: new Map(),
  lineupCount: 0
};

/**
 * @description Reducer function to route and handle calls to update the context.
 * @param state
 * @param action
 */
export function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'ADD_CHARACTER': {
      if (state.lineup.size < 5) {
        const character = action.data as IMarvelCharacter;

        state.lineup.set(character.id, character);
      }

      return {...state, lineupCount: state.lineup.size};
    }
    case 'REMOVE_CHARACTER': {
      if (state.lineup.size > 0) {
        const characterId = action.data as number;

        if (state.lineup.has(characterId)) {
          state.lineup.delete(characterId);
        }
      }

      return {...state, lineupCount: state.lineup.size};
    }
    default:
      return state;
  }
}

export const Context = createContext<[IState, Dispatch<IAction>]>([initialState, () => {}]);

/**
 * @description Wrapper component to provide context to children.
 * @param props
 * @constructor
 */
export function ContextProvider(props: IProviderProps) {
  const {children} = props;

  return <Context.Provider value={useReducer(reducer, initialState)}>{children}</Context.Provider>;
}
