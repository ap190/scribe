import React from "react";
import PropTypes from "prop-types";
import ActionBarIcon from "../../../common/ActionBarIcon";
import { lightTheme } from "../../../../utils/const";

const EditorActionBar = ({
  handleSave,
  handleMaximize,
  handleNextThread,
  isEditorToggled,
  handleExportToHTML
}) => (
  <div className="editor-action-bar">
    <div className="editor-action-bar-icon-container">
      <ActionBarIcon
        icon={lightTheme.icons.save}
        title={"Save"}
        handleClick={handleSave}
      />
      <ActionBarIcon
        icon={lightTheme.icons.export}
        title={"Export"}
        handleClick={() => handleExportToHTML()}
      />
      <ActionBarIcon
        title={isEditorToggled ? "Minimize" : "Maximize"}
        icon={lightTheme.icons.maximize}
        handleClick={handleMaximize}
      />
      <ActionBarIcon
        title={"Next"}
        icon={lightTheme.icons.next}
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
