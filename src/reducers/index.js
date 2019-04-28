import { combineReducers } from 'redux'
import * as _ from "lodash";
import {
  CHANGE_ITEMS_PER_PAGE,
  FAIL_POSTER_INFO, FAIL_SEARCH_SHOWS,
  RECEIVE_PAGINATION_INFO,
  RECEIVE_POSTER_INFO, RECEIVE_SEARCH_SHOWS,
  RECEIVE_SHOWS, REQUEST_SEARCH_SHOWS,
  REQUEST_SHOWS, SET_SEARCH_MODE,
  SET_PAGE, SET_SEARCH_VALUE,
  SHOW_IMG, SHOW_FULL_OVERVIEW
} from "../actions";

export const OVERVIEW_LIMIT = 200;

export function showsReducer(state = {}, action) {
  let id;
  switch (action.type) {
    case REQUEST_SHOWS:
      return {
        ...state,
        infoNeedToBeChanged: false,
        showsDownloaded: false
      };
    case REQUEST_SEARCH_SHOWS:
      return {
        ...state,
        infoNeedToBeChanged: false,
        showsDownloaded: false
      };
    case RECEIVE_SHOWS:
      id = 1 + (state.pageNumber - 1) * state.itemsPerPage;
      return {
        ...state,
        info: action.shows && action.shows.map(show => ({
          id: id++,
          title: show.title,
          overview: show.overview,
          fullOverviewShowed: !show.overview || show.overview.length <= OVERVIEW_LIMIT,
          year: show.year,
          rating: show.rating,
          votes: show.votes,
          posterId: show.ids.tvdb,
          slug: show.ids.slug,
          imgLoaded: false,
        })),
        showsDownloaded: true
      };
    case RECEIVE_SEARCH_SHOWS:
      id = 1 + (state.pageNumber - 1) * state.itemsPerPage;
      return {
        ...state,
        info: action.shows && action.shows.map(item => ({
          id: id++,
          title: item.show.title,
          overview: item.show.overview,
          fullOverviewShowed: !item.show.overview || item.show.overview.length <= OVERVIEW_LIMIT,
          year: item.show.year,
          rating: item.show.rating,
          votes: item.show.votes,
          posterId: item.show.ids.tvdb,
          slug: item.show.ids.slug,
          imgLoaded: false,
        })),
        showsDownloaded: true
      };
    case RECEIVE_PAGINATION_INFO:
      return {
        ...state,
        pageCount: action.pageCount,
        itemCount: action.itemCount
      };
    case RECEIVE_POSTER_INFO:
      // TODO: normal algo
      return {
        ...state,
        info: state.info && state.info.map(show =>
            show.posterId === action.posterId ? {...show, posterUrl: getPosterUrlFromInfo(action.info)} : show
          )
      };
    case FAIL_POSTER_INFO:
      return {
        ...state,
        info: state.info && state.info.map(show =>
          show.posterId === action.posterId ? {...show, posterUrl: "no info"} : show
        )
      };
    case SHOW_IMG:
      return {
        ...state,
        info: state.info && state.info.map(show =>
          show.id === action.showId ? {...show, imgLoaded: true} : show
        )
      };
    case SET_PAGE:
      return {
        ...state,
        pageNumber: (action.pageNumber < 1) || (action.pageNumber > state.pageCount) ? state.pageNumber :
          action.pageNumber,
        infoNeedToBeChanged: true
      };
    case CHANGE_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.items,
        pageNumber: 1,
        infoNeedToBeChanged: true
      };
    case SHOW_FULL_OVERVIEW:
      return {
        ...state,
        info: state.info.map(show => show.id === action.id ? {...show, fullOverviewShowed: true} : show)
      }
  }
  return state;
}

function getPosterUrlFromInfo(info) {
  if (info.tvposter) {
    if (info.tvposter instanceof Array) return info.tvposter[0].url;
    return info.tvposter.url;
  }
  if (info.seasonposter) {
    if (info.seasonposter instanceof Array) return info.seasonposter[0].url;
    return info.seasonposter.url;
  }
  return "no posters";
}

function searchReducer(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        value: _.escapeRegExp(action.value.trim())
      };
    case REQUEST_SEARCH_SHOWS:
      return {
        ...state,
        previousValue: state.value,
        value: "",
        pending: true,
        failed: false
      };
    case RECEIVE_SEARCH_SHOWS:
      return {
        ...state,
        pending: false
      };
    case FAIL_SEARCH_SHOWS:
      return {
        ...state,
        pending: false,
        failed: true
      };
  }
  return state;
}

function infoReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_SEARCH_SHOWS:
      return {
        ...state,
        fetchedSearchMode: state.searchMode,
        mode: "search",
      };
    case REQUEST_SHOWS:
      return {
        ...state,
        mode: "popular",
      };
    case SET_SEARCH_MODE:
      return {
        ...state,
        searchMode: action.mode,
      }
  }
  return state;
}


const rootReducer = combineReducers({
  shows: showsReducer,
  search: searchReducer,
  info: infoReducer,
});

export default rootReducer;
