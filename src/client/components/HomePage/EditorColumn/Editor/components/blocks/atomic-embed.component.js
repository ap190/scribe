import React, { Component } from "react";
import PropTypes from "prop-types";

class AtomicEmbedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showIframe: false
    };

    this.enablePreview = this.enablePreview.bind(this);
  }

  componentDidMount() {
    this.renderEmbedly();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showIframe !== this.state.showIframe &&
      this.state.showIframe === true
    ) {
      this.renderEmbedly();
    }
  }

  getScript() {
    const script = document.createElement("script");
    script.async = 1;
    script.src = "https://cdn.embedly.com/widgets/platform.js";
    script.onload = () => {
      window.embedly();
    };
    document.body.appendChild(script);
  }

  enablePreview() {
    this.setState({
      showIframe: true
    });
  }

  renderEmbedly() {
    if (window.embedly) {
      window.embedly();
    } else {
      this.getScript();
    }
  }

  render() {
    const url = this.props.data;
    const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
    return (
      <div className="md-block-atomic-embed">
        <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
      </div>
    );
  }
}

AtomicEmbedComponent.propTypes = {
  data: PropTypes.string.isRequired
};

export default AtomicEmbedComponent;
