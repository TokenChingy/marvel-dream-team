# Marvel Dream Team

## Introduction

Marvel Dream Team is a simple web application that allows you to create your own Marvel character lineup of up to five characters.

## Get Started

The `package-lock.json` file is included, so you can use `npm ci` to install the correct dependencies. If that doesn't work, and you
have peer dependency issues due to using the newer npm versions, you may need to add the flag `--legacy-peer-deps`. If all fails,
you can use `npm install`.

`npm start` will start the development server and serve the application locally. You will need to configure your `.env` file. Please see
the `.env.example` file for the required environmental variables.

You can run the tests within the project by running `npm run test`.

## Retrospect

To begin with, I had fun with this coding challenge. I spent a bit more than the target time on it as I can be a bit of a perfectionist (I realised after
a while, so I wrapped it up quickly). I ended up spending about 6 hours on this.

If I had more time, I would have done the following:

- Implement keyboard shortcut for choosing a Marvel character.
- Write tests for `CharacterCard.tsx`, `CharacterModal.tsx`, and `Lineup.tsx`.
- Write more comprehensive tests for `Search.tsx`.
- Implement React Router and the ability to read the URL param so that I could encode a "shareable" link to the lineup.
- Fix the transition bug that causes the scrollbars to appear.
- Implement auto-clearing of the search term after selecting the character.