import React from "react";
const Header = props => (
  <div
    style={{
      marginLeft: "10px",
      color: "#000000",
      fontFamily: "AvenirNext-Bold",
      fontSize: "20px"
    }}
  >
    {props.title}
  </div>
);

export default Header;
