import React from "react";
import PropTypes from "prop-types";
import ActionBarIcon from "../../../common/ActionBarIcon";
import saveIcon from "../../../../../../public/assets/icons/save.png";
import nextIcon from "../../../../../../public/assets/icons/next.png";
import exportIcon from "../../../../../../public/assets/icons/export.png";
import fullScreenIcon from "../../../../../../public/assets/icons/full_screen.png";

const EditorActionBar = ({
  handleSave,
  handleMaximize,
  handleNextThread,
  isEditorToggled,
  handleExportToHTML
}) => (
  <div className="editor-action-bar">
    <div className="editor-action-bar-icon-container">
      <ActionBarIcon icon={saveIcon} title={"Save"} handleClick={handleSave} />
      <ActionBarIcon
        icon={exportIcon}
        title={"Export"}
        handleClick={() => handleExportToHTML()}
      />
      <ActionBarIcon
        title={isEditorToggled ? "Minimize" : "Maximize"}
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
  handleNextThread: PropTypes.func.isRequired,
  isEditorToggled: PropTypes.bool.isRequired,
  handleExportToHTML: PropTypes.func.isRequired
};

export default EditorActionBar;
