import React from "react";
import PropTypes from "prop-types";
import darkTheme from "../../../../themes/dark-theme";
import lightTheme from "../../../../themes/light-theme";

const divStyle = isDark => {
  return {
    backgroundColor: isDark
      ? darkTheme.threads.search.backgroundColor
      : lightTheme.threads.search.backgroundColor,
    color: isDark
      ? darkTheme.threads.search.color
      : lightTheme.threads.search.color,
    borderRadius: "30px",
    border: "none",
    textIndent: "18px",
    fontSize: "14px",
    fontFamily: "AvenirNext-Regular",
    outline: "none",
    lineHeight: "28px",
    width: "100%",
    top: "0",
    WebkitAppRegion: "no-drag"
  };
};

const wrapperStyle = {
  margin: "24px 10px"
};

const Search = props => (
  <div style={wrapperStyle}>
    <input
      type="text"
      style={divStyle(props.darkTheme)}
      value={props.query}
      placeholder="Search by keywords"
      onChange={event => props.onQueryChangeHandler(event)}
    />
  </div>
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChangeHandler: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

export default Search;
