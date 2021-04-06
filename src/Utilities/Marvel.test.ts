import {getCharacters, parseNameStartsWith} from './Marvel';

describe('`parseNameStartsWith` Function', function (): void {
  it('Should handle empty strings.', function (): void {
    const expected = '';
    const actual = parseNameStartsWith('');

    expect(actual).toBe(expected);
  });
});

describe('`getCharacters` Function', function (): void {
  it('Should return all the Hulk characters.', async function (): Promise<void> {
    const response = await getCharacters('Hulk');

    expect(response.length).toBe(9);
  });
  it('Should throw a TypeError when environmental variables are not set thus not able to connect.', async function (): Promise<void> {
    const gateway = process.env.REACT_APP_MARVEL_GATEWAY;
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;

    /**
     * NOTE: We only do this because we are expecting an error which is a TypeError.
     * Since this is the only error thrown into console.error, we will silence it.
     */
    jest.spyOn(console, 'error').mockImplementation(() => {});

    process.env.REACT_APP_MARVEL_GATEWAY = undefined;
    process.env.REACT_APP_MARVEL_PUBLIC_KEY = undefined;

    let errorObject;

    try {
      await getCharacters('Hulk');
    } catch (error) {
      errorObject = error;
    }

    expect(errorObject).toBeInstanceOf(TypeError);

    process.env.REACT_APP_MARVEL_GATEWAY = gateway;
    process.env.REACT_APP_MARVEL_PUBLIC_KEY = publicKey;
  });
});
