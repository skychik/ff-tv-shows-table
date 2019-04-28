import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions"
import LoadingSpinner from "../components/LoadingSpinner";
import * as _ from "lodash";
import {OVERVIEW_LIMIT} from "../reducers";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleSorting = this.handleSorting.bind(this);
  }

  handleSorting(event) {

  }

  render() {
    const {shows} = this.props;
    console.log("!shows.info || shows.info === []");
    console.log(!shows.info || shows.info.isEmpty);

    // if (!shows.info || shows.info === []) {
    //   return "No such shows ;("
    // }

    const showsElems = shows.info && shows.info.map(show => {
        const overview = <div>
          <div className="overview">
            {!show.overview ? <div style={{textAlign: "center"}}>¯\_(ツ)_/¯</div> :
                show.fullOverviewShowed ? show.overview : show.overview.substr(0, OVERVIEW_LIMIT) + "..."}
          </div>
          <div>
            {show.fullOverviewShowed ? "" :
              <button className="showFullOverview-btn" onClick={() => this.props.showFullOverview(show.id)}>
                Full overview
              </button>
            }
          </div>
        </div>;
        const year = show.year ? show.year : "¯\\_(ツ)_/¯";
        // const rating = !show.rating || !show.votes ? "¯\\_(ツ)_/¯" : <span>
        //   <p>{show.rating}</p>*<p>{show.votes}</p>={show.rating * show.votes}
        // </span>;
        const rating = show.rating;

        return <tr key={show.id}>
          <td>{show.id}</td>
          <td>
            <a href={"https://trakt.tv/shows/" + show.slug} target="_blank" rel="noopener noreferrer">
              {show.title}
            </a>
          </td>
          <td>{overview}</td>
          <td>{year}</td>
          <td>{Number((rating).toFixed(2))}</td>
          <td>
            {!show.posterUrl ? <LoadingSpinner/> :
              show.posterUrl === "no posters" ? <p>Only logo :(</p> :
                show.posterUrl === "no info" ? <p>No posters ;(</p> :
                  <a href={show.posterUrl} rel="noopener noreferrer" target="_blank">
                    {!show.imgLoaded ? <LoadingSpinner/> : ""}
                    <img src={show.posterUrl} className="poster" alt={show.title + " poster"}
                         onLoad={() => this.props.revealImg(show.id)} hidden={!show.imgLoaded}/>
                  </a>
            }
          </td>
        </tr>
      }
    );

    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th className="No-header" onClick={() => this.props.setSorting("No")}>№</th>
              <th className="title-header">Title</th>
              <th className="overview-header">Overview</th>
              <th className="year-header">Year</th>
              <th className="rating-header">Rating</th>
              {/*<th className={"ascend"}>Rating * Votes number</th>*/}
              <th className="poster-header">Poster</th>
            </tr>
          </thead>
          <tbody>{showsElems}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
    info: state.info
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
