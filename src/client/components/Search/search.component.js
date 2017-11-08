import React from "react";
import PropTypes from "prop-types"; // ES6

const divStyle = {
  height: "30px",
  padding: "10px",
  backgroundColor: "pink",
  margin: "10px",
  marginTop: "20px",
  borderRadius: "5px"
};

const Search = props => (
  <input
    type="text"
    style={divStyle}
    value={props.query}
    onChange={event => props.onQueryChangeHandler(event)}
  />
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChangeHandler: PropTypes.func.isRequired
};

export default Search;
