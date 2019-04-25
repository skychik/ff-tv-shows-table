import React from "react";
import PropTypes from 'prop-types';

const Paginator = (props) => {
  // TODO: click time limit
  return <ul className="pagination">
    {props.currPage <= 2 ? "" :
      <li><a href="#" onClick={() => props.setPage(1)} className="prev">«</a></li>
    }
    {props.currPage === 1 ? "" :
      <li><a href="#" onClick={() => props.setPage(props.currPage - 1)}>{props.currPage - 1}</a></li>
    }
    <li><a className="active">{props.currPage}</a></li>
    {props.currPage === props.totalPages ? "" :
      <li><a href="#" onClick={() => props.setPage(props.currPage + 1)}>{props.currPage + 1}</a></li>
    }
    {props.currPage >= props.totalPages - 1 ? "" :
      <li><a href="#" onClick={() => props.setPage(props.totalPages)} className="next">»</a></li>
    }
  </ul>;
};

Paginator.propTypes = {
  setPage: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Paginator;
