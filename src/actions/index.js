import fetch from 'cross-fetch';

const TRAKT_CLIENT_KEY = "1098aa9283a45930885916b98e046d43cd7301e4de4198c5e624aa39b5cd6972";
const FANART_PERSONAL_KEY = "313966685b1712ca5f9c4c15427da38d";
const FANART_PROJECT_KEY = "4a2226e35da3b653ed9d980ae3efb5f8";
export const REQUEST_SHOWS = "REQUEST_SHOWS";
export const RECEIVE_SHOWS = "RECEIVE_SHOWS";
export const REQUEST_POSTER_INFO = "REQUEST_POSTER_INFO";
export const RECEIVE_POSTER_INFO = "RECEIVE_POSTER_INFO";
export const FAIL_POSTER_INFO = "FAIL_POSTER_INFO";
export const RECEIVE_PAGINATION_INFO = "RECEIVE_PAGINATION_INFO";
export const SET_PAGE = "SET_PAGE";
export const CHANGE_ITEMS_PER_PAGE = "CHANGE_ITEMS_PER_PAGE";
export const SHOW_IMG = "SHOW_IMG";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const REQUEST_SEARCH_SHOWS = "REQUEST_SEARCH_SHOWS";
export const RECEIVE_SEARCH_SHOWS = "RECEIVE_SEARCH_SHOWS";
export const FAIL_SEARCH_SHOWS = "FAIL_SEARCH_SHOWS";
export const SET_SEARCH_MODE = "SET_SEARCH_MODE";
export const SHOW_FULL_OVERVIEW = "SHOW_FULL_OVERVIEW";

const traktOptions = {
  headers: {
    "Content-Type": 'application/json',
    "trakt-api-version": '2',
    "trakt-api-key": TRAKT_CLIENT_KEY
  }
};


// Getting all shows info

export const fetchShows = (pageNumber, itemsPerPage) => dispatch => {
  dispatch(requestShows());

  const url = "https://api.trakt.tv/shows/popular?extended=full&page=" + pageNumber + "&limit=" + itemsPerPage;
  return fetch(url, traktOptions)
    .then(response => {
      if (!response.ok) {
        dispatch(failSearchShows())
      } else {
        dispatch(receivePaginationInfo(response));
        return response.json()
      }
    })
    .then(json => {
      dispatch(receiveShows(json));
      json.map(info => dispatch(fetchPosterInfo(info.ids.tvdb)));
    });
};

const requestShows = () => ({
  type: REQUEST_SHOWS
});

const receiveShows = shows => ({
  type: RECEIVE_SHOWS,
  shows: shows,
});

export const receivePaginationInfo = response => ({
  type: RECEIVE_PAGINATION_INFO,
  pageCount: parseInt(response.headers.get("X-Pagination-Page-Count")),
  itemCount: parseInt(response.headers.get("X-Pagination-Item-Count")),
});

// Search

export const setSearchValue = value => ({
  type: SET_SEARCH_VALUE,
  value: value
});

export const searchShows = (value, searchMode, pageNumber, itemsPerPage) => dispatch => {
  dispatch(requestSearchShows());
  console.log("value=" + value);
  let searchByField;
  switch (searchMode) {
    case "title":
      searchByField = "title";
      break;
    case "overview":
      searchByField = "overview";
      break;
    case "anyLangTitle":
      searchByField = "aliases";
      break;
    default:
      searchByField = "";
  }
  const url = "https://api.trakt.tv/search/show?extended=full&field=" + searchByField + "&query=" + value +
    "&page=" + pageNumber + "&limit=" + itemsPerPage;
  return fetch(url, traktOptions)
    .then(response => {
      if (!response.ok) {
        dispatch(failSearchShows())
      } else {
        dispatch(receivePaginationInfo(response));
        return response.json()
      }
    })
    .then(json => {
      dispatch(receiveSearchShows(json));
      json.map(info => dispatch(fetchPosterInfo(info.show.ids.tvdb)));
    });
};

const requestSearchShows = () => ({
  type: REQUEST_SEARCH_SHOWS
});

const receiveSearchShows = shows => ({
  type: RECEIVE_SEARCH_SHOWS,
  shows: shows,
});

const failSearchShows = () => ({
  type: FAIL_SEARCH_SHOWS
});


// Getting poster info

export const fetchPosterInfo = posterId => dispatch => {
  dispatch(requestPosterInfo(posterId));

  const url = "https://webservice.fanart.tv/v3/tv/" + posterId + "?api_key=" + FANART_PROJECT_KEY +
    "&client_key=" + FANART_PERSONAL_KEY;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        dispatch(failPosterInfo(posterId))
      } else {
        return response.json()
      }
    })
    .then(json => dispatch(receivePosterInfo(json, posterId)));
};

export const requestPosterInfo = posterId => ({
  type: REQUEST_POSTER_INFO,
  posterId: posterId
});

export const receivePosterInfo = (info, posterId) => ({
  type: RECEIVE_POSTER_INFO,
  info: info,
  posterId: posterId
});

export const failPosterInfo = posterId => ({
  type: FAIL_POSTER_INFO,
  posterId: posterId
});

export const revealImg = showId => ({
  type: SHOW_IMG,
  showId: showId
});


// Pagination

export const setPage = pageNumber => ({
  type: SET_PAGE,
  pageNumber: pageNumber,
});

export const changeItemsPerPage = value => ({
  type: CHANGE_ITEMS_PER_PAGE,
  items: value
});


// Mode

export const setSearchMode = mode => ({
  type: SET_SEARCH_MODE,
  mode: mode,
});


export const showFullOverview = id => ({
  type: SHOW_FULL_OVERVIEW,
  id: id,
});
