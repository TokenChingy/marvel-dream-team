import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';

import Header from './Header';

afterEach(cleanup);

describe('Header Component', function (): void {
  it('Should display "Dream Team" in the secondary toolbar.', function (): void {
    render(<Header />);

    expect(screen.getByRole('heading')).toHaveTextContent('Dream Team');
  });
});
