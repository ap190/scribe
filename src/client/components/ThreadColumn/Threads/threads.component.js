import React, { Component } from "react"
import PropTypes from "prop-types"
import CreateFlow from "../CreateFlow/create-flow.component"
import Search from "../Search/search.component"
import ThreadList from "../ThreadList/thread-list.component"
import ColumnFooter from "../../ColumnFooter"
import Icon from "../../Icon"
import { Images } from "../../../themes"

const divStyle = {
  position: "relative",
  height: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column"
}

class ThreadColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_thread: false,
      query: ""
    }
    this.onQueryChange = this.onQueryChange.bind(this)
    this.onDeleteThread = this.onDeleteThread.bind(this)
  }

  onQueryChange(event) {
    this.setState({
      ...this.state,
      query: event.target.value
    })
  }

  onDeleteThread(threadId) {
    this.setState({
      ...this.state,
      current_threads: this.state.current_threads.filter(
        thread => thread.id !== threadId
      )
    })
  }

  changeThreadColor(threadId, threadColor) {
    this.setState({
      ...this.state,
      current_threads: this.state.current_threads.map(thread => {
        if (thread.id === threadId) {
          thread.highlightColor = threadColor
        }
        return thread
      })
    })
  }

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "1.2" }
  }

  handleIconTrick = () => {
    const { threads } = this.props
    this.props.handleAddThread(threads)
  }

  render() {
    const { isModalOpen } = this.props
    return (
      <div style={{ ...divStyle, ...this.isEditorToggledStyles() }}>
        <Search
          query={this.state.query}
          onQueryChangeHandler={this.onQueryChange}
        />
        <ThreadList
          threads={this.props.threads}
          onDeleteThreadHandler={this.onDeleteThread}
          query={this.state.query}
          toggleModal={this.props.toggleModal}
          selectThread={this.props.selectThread}
        />
  
        {!isModalOpen && (
          <ColumnFooter>
            <Icon icon={Images.addIcon} handleClick={this.handleIconTrick} />
            <div className="add-flow-description">Start a Flow</div>
          </ColumnFooter>
        )}
      </div>
    )
  }
}

ThreadColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  threads: PropTypes.array,
  selectThread: PropTypes.func.isRequired,
  handleAddThread: PropTypes.func.isRequired
}

export default ThreadColumn
