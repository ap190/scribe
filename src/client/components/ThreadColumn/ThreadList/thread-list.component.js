import React from "react";
import PropTypes from "prop-types"; // ES6
import Thread from "../Thread/thread.component";

const divStyle = {
  display: "flex",
  height: "auto",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "auto",
  flexDirection: "column"
};

const filterThreadListItem = (query, thread) =>
  thread.text.includes(query) || thread.title.includes(query);

const ThreadList = props => (
  <div style={divStyle}>
    {props.threads.map(
      thread =>
        filterThreadListItem(props.query, thread) ? (
          <Thread
            text={thread.text}
            title={thread.title}
            date={thread.date}
            key={thread.id}
            id={thread.id}
            onDeleteThreadHandler={props.onDeleteThreadHandler}
          />
        ) : null
    )}
  </div>
);

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  query: PropTypes.string.isRequired,
  onDeleteThreadHandler: PropTypes.func.isRequired
};

export default ThreadList;
