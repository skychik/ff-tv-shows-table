import React from "react";
import PropTypes from 'prop-types';

// TODO: click time limit
const Paginator = (props) => {
  const {currPage, totalPages} = props;

  const paginatorClassName = "pagination";
  const prevButton = currPage <= 3 ? "" :
    <li>
      <a className="prev" onClick={() => props.setPage(1)} >
        «
      </a>
    </li>;
  const nextButton = currPage >= totalPages - 2 ? "" :
    <li>
      <a className="next" onClick={() => props.setPage(totalPages)}>
        »
      </a>
    </li>;
  const numberedButtonMaker = (buttNumb, pageNumb) => {
    return (pageNumb < buttNumb) || (pageNumb > totalPages) ? "" :
      <li>
        <a className={currPage === pageNumb ? "active" : ""} onClick={() => props.setPage(pageNumb)}>
          {pageNumb}
        </a>
      </li>
  };

  if (currPage - 2 < 1) {
    return <ul className={paginatorClassName}>
      {prevButton}
      {numberedButtonMaker(1, 1)}
      {numberedButtonMaker(2, 2)}
      {numberedButtonMaker(3, 3)}
      {numberedButtonMaker(4, 4)}
      {numberedButtonMaker(5, 5)}
      {nextButton}
    </ul>;
  }

  if (currPage + 2 > totalPages) {
    return <ul className={paginatorClassName}>
      {prevButton}
      {numberedButtonMaker(1,totalPages - 4)}
      {numberedButtonMaker(2,totalPages - 3)}
      {numberedButtonMaker(3,totalPages - 2)}
      {numberedButtonMaker(4,totalPages - 1)}
      {numberedButtonMaker(5,totalPages)}
      {nextButton}
    </ul>;
  }

  return <ul className={paginatorClassName}>
    {prevButton}
    {numberedButtonMaker(1, currPage - 2)}
    {numberedButtonMaker(2, currPage - 1)}
    {numberedButtonMaker(3, currPage)}
    {numberedButtonMaker(4, currPage + 1)}
    {numberedButtonMaker(5, currPage + 2)}
    {nextButton}
  </ul>;
};

Paginator.propTypes = {
  setPage: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Paginator;
