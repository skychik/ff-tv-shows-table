import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions"

class Table extends React.Component {
  render() {
    const {shows} = this.props;
    const showsElems = shows && shows.info && shows.info.map(show =>
      <tr key={show.id}>
        <td>{show.id}</td>
        <td>{show.title}</td>
        <td>{show.year ? show.year : "¯\\_(ツ)_/¯"}</td>
        <td>
          {!show.posterUrl ? "" :
            show.posterUrl === "no posters" ? <p>Only logo :(</p> :
              show.posterUrl === "no info" ? <p>No posters ;(</p> :
                <a href={show.posterUrl} target="_blank">
                  <img src={show.posterUrl} className="poster" alt={show.title + " poster"}/>
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
