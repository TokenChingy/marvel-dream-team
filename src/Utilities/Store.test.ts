import {getCharacters, IMarvelCharacter} from './Marvel';
import {reducer, initialState, IAction, IState} from './Store';

describe('Store Reducer Function', function () {
  it('Should handle ADD_CHARACTER', async function () {
    const hulkCharacters = await getCharacters('Hulk');
    const actualHulk: IMarvelCharacter = hulkCharacters[0];

    const addAction: IAction = {
      type: 'ADD_CHARACTER',
      data: actualHulk
    };

    reducer(initialState, addAction);

    expect(initialState.lineup.size).toBe(1);
    expect(initialState.lineup.get(actualHulk.id)).toBe(actualHulk);
  });
  it('Should handle REMOVE_CHARACTER', async function () {
    const hulkCharacters = await getCharacters('Hulk');
    const actualHulk: IMarvelCharacter = hulkCharacters[0];

    const addAction: IAction = {
      type: 'ADD_CHARACTER',
      data: actualHulk
    };

    reducer(initialState, addAction);

    const removeAction: IAction = {
      type: 'REMOVE_CHARACTER',
      data: actualHulk.id
    };

    reducer(initialState, removeAction);

    expect(initialState.lineup.size).toBe(0);
  });
  it('Should only allow 5 characters to be added to the lineup.', async function () {
    const hulkCharacters = await getCharacters('Hulk');

    hulkCharacters.forEach(function (hulk: IMarvelCharacter) {
      const addAction: IAction = {
        type: 'ADD_CHARACTER',
        data: hulk
      };

      reducer(initialState, addAction);
    });

    expect(initialState.lineup.size).toBe(5);
  });
});
