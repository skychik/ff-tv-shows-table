import React from 'react';
import '../App.css';
import Table from "./Table";
import * as actionCreators from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class App extends React.Component {
  componentWillMount() {
    const {shows} = this.props;
    if (shows && shows.infoFetched === false) {
      this.props.fetchShows(shows.pageNumber, shows.itemsPerPage);
    }
  }

  render() {
    const {shows} = this.props;
    const extraInfo = <div>
      <p>TV-shows displayed: {shows.itemsPerPage}. Page {shows.pageNumber} of {shows.pageCount}</p>
      <p>Shows in total: {shows.itemCount}</p>
    </div>;

    return <div className="App">
      <Table/>
      {shows.infoFetched ? extraInfo : null}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
