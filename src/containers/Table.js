import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions"
import LoadingSpinner from "../components/LoadingSpinner";

class Table extends React.Component {
  render() {
    const {shows} = this.props;
    const showsElems = shows && shows.info && shows.info.map(show =>
      <tr key={show.id}>
        <td>{show.id}</td>
        <td>{show.title}</td>
        <td>{show.year ? show.year : "¯\\_(ツ)_/¯"}</td>
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
    );

    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Title</td>
              <td>Year</td>
              <td>Poster</td>
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
    shows: state.shows
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
