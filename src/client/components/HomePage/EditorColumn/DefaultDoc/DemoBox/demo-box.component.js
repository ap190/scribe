import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import "./demo-box.css";

class DemoBox extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { isOpen: false };
  }

  onClick() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    return (
      <div className="demo">
        <div className={cx("demo-wrapper", { "is-open": this.state.isOpen })}>
          <button
            className="js-container-target demo-toggle-button"
            onClick={this.onClick}
          >
            {this.props.sectionTitle}
            <div className="demo-meta">{this.props.subTitle}</div>
          </button>
          <div className="demo-box">
            <p>{this.props.explanationBlurb}</p>
          </div>
        </div>
      </div>
    );
  }
}

DemoBox.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  explanationBlurb: PropTypes.string.isRequired
};

DemoBox.defaultProps = {
  sectionTitle: "Title",
  subTitle: "subtitle",
  explanationBlurb: "hello content!"
};

export default DemoBox;