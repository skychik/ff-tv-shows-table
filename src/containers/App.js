import React from 'react';
import '../App.css';
import Table from "./Table";
import * as actionCreators from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Paginator from "../components/Paginator";
import LoadingPage from "../components/LoadingPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeItemsPerPage(event.target.value);
  }

  render() {
    const {shows} = this.props;
    const infoLoaded = shows.pageCount && shows.itemCount;
    const header = <h1>
      TV SERIES POSTERS
    </h1>;

    if (shows.infoNeedToBeChanged) {
      this.props.fetchShows(shows.pageNumber, shows.itemsPerPage);
      return <div className="App">
        <LoadingPage/>
      </div>
    }
    if (!shows.showsDownloaded) {
      return <div className="App">
        <LoadingPage/>
      </div>
    }
    if (!infoLoaded) {
      return <div className="App">
        {header}
        <Table/>
      </div>;
    }
    const extraInfo = <div>
      <p>TV-shows displayed:
        <select value={shows.itemsPerPage} onChange={this.handleChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>. Page {shows.pageNumber} of {shows.pageCount}</p>
      <p>Shows in total: {shows.itemCount}</p>
    </div>;
    return <div className="App">
      {header}
      <Paginator setPage={(p) => this.props.setPage(p)} currPage={shows.pageNumber} totalPages={shows.pageCount}/>
      <Table/>
      {extraInfo}
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
