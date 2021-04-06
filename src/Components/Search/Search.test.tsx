import React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import * as Store from '../../Utilities/Store';
import Search from './Search';
import userEvent from '@testing-library/user-event';

describe('Search Component', function () {
  it('Should render the search component and on click it should open a list.', function () {
    render(
      <Store.ContextProvider>
        <Search />
      </Store.ContextProvider>
    );

    const autoCompleteSearchElement = screen.getByRole('searchbox');

    userEvent.click(autoCompleteSearchElement, {
      button: 1
    });

    const autoCompleteListElement = screen.getByRole('presentation');

    expect(autoCompleteListElement).toBeVisible();
  });
});
