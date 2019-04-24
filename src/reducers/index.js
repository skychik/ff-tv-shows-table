import { combineReducers } from 'redux'
import {RECEIVE_POSTER_INFO, RECEIVE_SHOWS, REQUEST_SHOWS} from "../actions";

export function showsReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_SHOWS:
      return {
        info: [],
        infoFetched: false
      };
    case RECEIVE_SHOWS:
      console.log(action.shows);
      let id = 0;
      return {
        info: action.shows.map(show => ({
          id: id++,
          title: show.title,
          year: show.year,
          posterId: show.ids.tvdb
        })),
        infoFetched: true
      };
    case RECEIVE_POSTER_INFO:
      // TODO: normal algo
      return {
        ...state,
        info: state.info.map(show =>
            show.posterId === action.posterId ? {...show, posterUrl: getPosterUrlFromInfo(action.info)} : show
          )
      }
  }
  return state;
}

function getPosterUrlFromInfo(info) {
  if (info.clearlogo) {
    if (info.clearlogo instanceof Array) return info.clearlogo[0].url;
    return info.clearlogo.url;
  }
  if (info.hdtvlogo) {
    if (info.hdtvlogo instanceof Array) return info.hdtvlogo[0].url;
    return info.hdtvlogo.url;
  }
  return null;
}

const rootReducer = combineReducers({
  shows: showsReducer
});

export default rootReducer;
