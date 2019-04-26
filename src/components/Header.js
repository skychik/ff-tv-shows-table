import React from "react";
import PropTypes from "prop-types";

const Header = (props) =>
  <h1>
    {props.text.toUpperCase()}
  </h1>;

Header.propTypes = {
  text: PropTypes.string.isRequired,
};


export default Header;
