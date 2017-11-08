import React from "react";
import PropTypes from "prop-types"; // ES6

const divStyle = {
  backgroundColor: "#F2F2F2",
  color: "#4A4A4A",
  margin: "10px",
  marginTop: "24px",
  borderRadius: "30px",
  border: "none",
  textIndent: "18px",
  fontSize: "14px",
  fontFamily: "AvenirNext-Regular",
  outline: "none",
  lineHeight: "28px"
};

const Search = props => (
  <input
    type="text"
    style={divStyle}
    value={props.query}
    placeholder="Search by keywords"
    onChange={event => props.onQueryChangeHandler(event)}
  />
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChangeHandler: PropTypes.func.isRequired
};

export default Search;
