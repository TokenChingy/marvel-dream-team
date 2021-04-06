import React from 'react';
import {render, screen} from '@testing-library/react';
import Background from './Background';

describe('Background Component', function (): void {
  it('Should still be able to interact with the children element.', async function (): Promise<void> {
    const clickMe = jest.fn();

    render(
      <Background>
        <button data-testid={'avengers'} onClick={clickMe} />
      </Background>
    );

    const buttonElement = screen.getByTestId('avengers');
    await buttonElement.click();

    expect(clickMe).toHaveBeenCalledTimes(1);
  });
});
