import React from 'react';
import '../App.css';
import Table from "./Table";
import * as actionCreators from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Paginator from "../components/Paginator";
import LoadingPage from "../components/LoadingPage";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeItemsPerPage(event.target.value);
  }

  render() {
    const {shows, info, search} = this.props;
    const infoLoaded = shows.pageCount && shows.itemCount;
    const extraInfo = <div>
      <p>
        TV-shows displayed:
        <select value={shows.itemsPerPage} onChange={this.handleChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>. Page {shows.pageNumber} of {shows.pageCount}</p>
      <p>Shows in total: {shows.itemCount}</p>
    </div>;
    const searchInfo = info.mode !== "search" ? "" :
        <h2>
          Searched results for: "{search.previousValue}".
          <button onClick={() => this.props.fetchShows(shows.pageNumber, shows.itemsPerPage)}>Show all TV-shows</button>
        </h2>;

    if (shows.infoNeedToBeChanged) {
      switch (info.mode) {
        case "popular":
          this.props.fetchShows(shows.pageNumber, shows.itemsPerPage);
          break;
        case "search":
          this.props.searchShows(search.value, shows.pageNumber, shows.itemsPerPage);
      }
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
        <SearchForm/>
        <Header text="tv show posters"/>
        {searchInfo}
        <Table/>
      </div>;
    }

    return <div className="App">
      <SearchForm/>
      <Header text="tv show posters"/>
      <Paginator setPage={(p) => this.props.setPage(p)} currPage={shows.pageNumber} totalPages={shows.pageCount}/>
      {searchInfo}
      <Table/>
      {extraInfo}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
    search: state.search,
    info: state.info,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
