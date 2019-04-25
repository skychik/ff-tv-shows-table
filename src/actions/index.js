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


// Getting all shows info

export function fetchShows(pageNumber, itemsPerPage) {
  return dispatch => {
    dispatch(requestShows());

    const url = "https://api.trakt.tv/shows/popular?page=" + pageNumber + "&limit=" + itemsPerPage;
    const options = {
      headers: {
        "Content-Type": 'application/json',
        "trakt-api-version": '2',
        "trakt-api-key": TRAKT_CLIENT_KEY
      }
    };
    return fetch(url, options)
      .then(response => {
        const pageCount = parseInt(response.headers.get("X-Pagination-Page-Count"));
        const itemCount = parseInt(response.headers.get("X-Pagination-Item-Count"));
        dispatch(receivePaginationInfo(pageCount, itemCount));
        return response.json()
      })
      .then(json => {
        dispatch(receiveShows(json));
        json.map(info => dispatch(fetchPosterInfo(info.ids.tvdb)));
      });
  }
}

export function requestShows() {
  return {
    type: REQUEST_SHOWS
  }
}

export function receiveShows(shows) {
  return {
    type: RECEIVE_SHOWS,
    shows: shows,
  }
}

export function receivePaginationInfo(pageCount, itemCount) {
  return {
    type: RECEIVE_PAGINATION_INFO,
    pageCount: pageCount,
    itemCount: itemCount,
  }
}


// Getting poster info

export function fetchPosterInfo(posterId) {
  return dispatch => {
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
  }
}

export function requestPosterInfo(posterId) {
  return {
    type: REQUEST_POSTER_INFO,
    posterId: posterId
  }
}

export function receivePosterInfo(info, posterId) {
  return {
    type: RECEIVE_POSTER_INFO,
    info: info,
    posterId: posterId
  }
}

export function failPosterInfo(posterId) {
  return {
    type: FAIL_POSTER_INFO,
    posterId: posterId
  }
}

export function revealImg(showId) {
  return {
    type: SHOW_IMG,
    showId: showId
  }
}


// Pagination

export function setPage(pageNumber) {
  return {
    type: SET_PAGE,
    pageNumber: pageNumber,
  }
}

export function changeItemsPerPage(value) {
  return {
    type: CHANGE_ITEMS_PER_PAGE,
    items: value
  }
}
