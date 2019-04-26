import React from "react";
import * as actionCreators from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setPage} from "../actions";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange() {
    this.props.setSearchValue(this.search.value);
  }

  handleKeyPressed(event) {
    if (event.key === "Enter") {
      this.handleSearch()
    }
  }

  handleSearch() {
    const {shows, search} = this.props;
    if (search.value !== "") {
      this.props.setPage(1);
      this.props.searchShows(search.value, shows.pageNumber, shows.itemsPerPage);
    }
  }

  // TODO: enter button
  // TODO: validation
  render() {
    const {shows, search} = this.props;
    return <div>
      <p>
        <input type="search" placeholder="Search..."
               ref={input => this.search = input} onChange={this.handleInputChange} onKeyPress={this.handleKeyPressed}/>
        <button onClick={this.handleSearch}>Find</button>
      </p>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
    search: state.search,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
