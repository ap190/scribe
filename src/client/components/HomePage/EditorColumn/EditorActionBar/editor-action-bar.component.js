import React from "react";
import PropTypes from "prop-types";
import ActionBarIcon from "../../../common/ActionBarIcon";
import saveIcon from "../../../../../../public/assets/icons/save.png";
import nextIcon from "../../../../../../public/assets/icons/next.png";
import fullScreenIcon from "../../../../../../public/assets/icons/full_screen.png";

const EditorActionBar = ({ handleSave, handleMaximize, handleNextThread }) => (
  <div className="editor-action-bar">
    <div className="editor-action-bar-icon-container">
      <ActionBarIcon icon={saveIcon} title={"Save"} handleClick={handleSave} />
      <ActionBarIcon
        title={"Maximiize"}
        icon={fullScreenIcon}
        handleClick={handleMaximize}
      />
      <ActionBarIcon
        title={"Next"}
        icon={nextIcon}
        handleClick={handleNextThread}
      />
    </div>
  </div>
);

EditorActionBar.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleMaximize: PropTypes.func.isRequired,
  handleNextThread: PropTypes.func.isRequired
};

export default EditorActionBar;
