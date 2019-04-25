import { combineReducers } from 'redux'
import {
  CHANGE_ITEMS_PER_PAGE,
  FAIL_POSTER_INFO,
  RECEIVE_PAGINATION_INFO,
  RECEIVE_POSTER_INFO,
  RECEIVE_SHOWS,
  REQUEST_SHOWS,
  SET_NEXT_PAGE, SET_PAGE,
  SET_PREVIOUS_PAGE
} from "../actions";

export function showsReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_SHOWS:
      return {
        ...state,
        infoNeedToBeChanged: false,
        showsDownloaded: false
      };
    case RECEIVE_SHOWS:
      console.log(action.shows);
      let id = 1;
      return {
        ...state,
        info: action.shows.map(show => ({
          id: id++,
          title: show.title,
          year: show.year,
          posterId: show.ids.tvdb
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
        info: state.info.map(show =>
            show.posterId === action.posterId ? {...show, posterUrl: getPosterUrlFromInfo(action.info)} : show
          )
      };
    case FAIL_POSTER_INFO:
      return {
        ...state,
        info: state.info.map(show =>
          show.posterId === action.posterId ? {...show, posterUrl: "no info"} : show
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

const rootReducer = combineReducers({
  shows: showsReducer
});

export default rootReducer;
