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
      this.props.fetchShows();
    }
  }

  render() {
    return <div className="App">
      <Table/>
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
