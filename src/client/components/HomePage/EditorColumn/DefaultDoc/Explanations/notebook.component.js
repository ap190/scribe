import React from "react";
import PropTypes from "prop-types";
import { Images } from "../../../../../themes";

const Notebook = props => (
  <div className="explanation">
    Notebooks organize thoughts by categories such as: projects, teams, clients
    or whatever suits you best
    <img src={Images.devImg} />
  </div>
);

Notebook.propTypes = {};

Notebook.defaultProps = {};

export default Notebook;
