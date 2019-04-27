import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions"
import LoadingSpinner from "../components/LoadingSpinner";

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
        const overview = show.overview ? show.overview : "¯\\_(ツ)_/¯";
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
          <td>{rating}</td>
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
              <th className={"No"} onClick={() => this.props.setSorting("No")}>№</th>
              <th>Title</th>
              <th>Overview</th>
              <th>Year</th>
              <th>Rating</th>
              {/*<th className={"ascend"}>Rating * Votes number</th>*/}
              <th>Poster</th>
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
