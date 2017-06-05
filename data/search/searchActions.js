import { curry } from 'folktale/core/lambda';
import compose from 'folktale/core/lambda/compose';
import map  from 'folktale/core/fantasy-land/map';
import chain  from 'folktale/core/fantasy-land/chain';
import { task } from 'folktale/data/task';
import Maybe from 'folktale/data/maybe';
import { createAction } from 'redux-actions';
import fetch from '../../helpers/api';
import { pipe } from '../../helpers/fn';

export const GET_SEARCH_RESULTS= 'SEARCH::GET_SEARCH_RESULTS';

const DUMMY_URL = 'https://jsonplaceholder.typicode.com/posts/1';


const transformDataSync = searchResults => searchResults;

const transformDataAsync = searchResults => task(resolver => {
  //Some sort of Async task
  resolver.resolve(Maybe.fromNullable(searchResults));
})

const asyncValidate = searchResults => task(resolver => {
  setTimeout(() => resolver.resolve(searchResults), 3000)
})


export const getSearchResultsRoot = fetch => {
  // ToDo(Pavlos): construct the url with the search criteria
  const getUrl = searchCriteria => DUMMY_URL;
  const fetchData = compose(fetch, getUrl);

  return createAction(
    GET_SEARCH_RESULTS,
    compose.all(
      map.curried(transformDataSync),
      chain.curried(asyncValidate),
      chain.curried(transformDataAsync),
      fetchData
    )
  );
};

export const getSearchResults = curry(1, getSearchResultsRoot)(fetch);
