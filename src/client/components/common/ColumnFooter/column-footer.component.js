import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import lightTheme from "../../../themes/light-theme";
import darkTheme from "../../../themes/dark-theme";

const getTheme = isDark => {
  return {
    backgroundColor: isDark
      ? darkTheme.columnFooter.backgroundColor
      : lightTheme.columnFooter.backgroundColor
  };
};

class ColumnFooter extends PureComponent {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space - between",
          width: "100%",
          height: "60px",
          padding: "20px",
          fontFamily: "AvenirNext-Bold",
          backgroundColor: getTheme(this.props.darkTheme).backgroundColor,
          zIndex: 2
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

ColumnFooter.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  children: PropTypes.any
};

export default ColumnFooter;
