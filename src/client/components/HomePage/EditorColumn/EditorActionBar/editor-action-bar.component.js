import React from "react";
import PropTypes from "prop-types";
import ActionBarIcon from "../../../common/ActionBarIcon";
import { lightTheme } from "../../../../utils/const";

const EditorActionBar = ({
  shouldShowNext,
  handleSave,
  handleMaximize,
  handleNextThread,
  isEditorToggled,
  handleExportToHTML,
  wasDocumentEdited
}) => (
  <div className="editor-action-bar">
    <div className="editor-action-bar-icon-container">
      {wasDocumentEdited ? (
        <ActionBarIcon
          icon={lightTheme.icons.save}
          title={"Save"}
          handleClick={handleSave}
        />
      ) : null}
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
      {shouldShowNext ? (
        <ActionBarIcon
          title={"Next"}
          icon={lightTheme.icons.next}
          handleClick={handleNextThread}
        />
      ) : null}
    </div>
  </div>
);

EditorActionBar.propTypes = {
  shouldShowNext: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleMaximize: PropTypes.func.isRequired,
  handleNextThread: PropTypes.func.isRequired,
  isEditorToggled: PropTypes.bool.isRequired,
  handleExportToHTML: PropTypes.func.isRequired,
  wasDocumentEdited: PropTypes.bool
};

export default EditorActionBar;
