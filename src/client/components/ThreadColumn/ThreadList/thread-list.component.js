import React from "react";
import PropTypes from "prop-types"; // ES6
import Thread from "../Thread/thread.component";

const divStyle = {
  display: "flex",
  height: "auto",
  padding: "10px",
  justifyContent: "center",
  marginTop: "20px",
  flexDirection: "column"
};

const ThreadList = props => (
  <div style={divStyle}>
    {props.threads.map(thread => (
      <Thread
        text={thread.text}
        title={thread.title}
        date={thread.date}
        key={thread.title}
      />
    ))}
  </div>
);

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ThreadList;
