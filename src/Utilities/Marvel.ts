export interface IMarvelUrl {
  type?: string;
  url?: string;
}

export interface IMarvelImage {
  path?: string;
  extension?: string;
}

export interface IMarvelComicSummary {
  resourceURI?: string;
  name?: string;
}

export interface IMarvelComic {
  available?: number;
  returned?: number;
  collectionURL?: string;
  items?: IMarvelComicSummary[];
}

export interface IMarvelStory {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: IMarvelStorySummary[];
}
export interface IMarvelStorySummary {
  resourceURI?: string;
  name?: string;
  type?: string;
}
export interface IMarvelEvent {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: IMarvelEventSummary[];
}
export interface IMarvelEventSummary {
  resourceURI?: string;
  name?: string;
}
export interface IMarvelSeries {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: IMarvelSeriesSummary;
}
export interface IMarvelSeriesSummary {
  resourceURI?: string;
  name?: string;
}

export interface IMarvelCharacter {
  id: number;
  name?: string;
  description?: string;
  modified?: string;
  resourceURI?: string;
  urls?: IMarvelUrl[];
  thumbnail?: IMarvelImage;
  comics?: IMarvelComic[];
  stories?: IMarvelStory[];
  events?: IMarvelEvent[];
  series?: IMarvelSeries[];
}

export function parseNameStartsWith(nameStartsWith: string): string {
  return nameStartsWith.trim() !== '' ? `&nameStartsWith=${nameStartsWith}` : '';
}

export async function getCharacters(nameStartsWith: string): Promise<IMarvelCharacter[]> {
  const gateway = process.env.REACT_APP_MARVEL_GATEWAY || '';
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY || '';
  const charactersEndpoint = '/v1/public/characters';

  const response = await fetch(
    `${gateway}${charactersEndpoint}?apikey=${publicKey}${parseNameStartsWith(nameStartsWith)}`,
    {
      method: 'GET'
    }
  );
  const parsedResponse = await response.json();

  return parsedResponse.data.results;
}
