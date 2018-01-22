import React from "react";
import PropTypes from "prop-types";
import ActionBarIcon from "../../../common/ActionBarIcon";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const getStyles = isDark => ({
  save: isDark ? "" : "",
  export: isDark ? "" : "",
  maximize: isDark ? "" : "",
  next: isDark ? "" : ""
});

const EditorActionBar = ({
  shouldShowNext,
  handleSave,
  handleMaximize,
  handleNextThread,
  isEditorToggled,
  handleExportToHTML,
  wasDocumentEdited,
  isDarkTheme
}) => (
  <div className="editor-action-bar">
    <div className="editor-action-bar-icon-container">
      {wasDocumentEdited ? (
        <ActionBarIcon
          icon={isDarkTheme ? darkTheme.icons.save : lightTheme.icons.save}
          title={"Save"}
          handleClick={handleSave}
          isDarkTheme={isDarkTheme}
        />
      ) : null}
      <ActionBarIcon
        icon={isDarkTheme ? darkTheme.icons.export : lightTheme.icons.export}
        title={"Export"}
        handleClick={() => handleExportToHTML()}
        isDarkTheme={isDarkTheme}
      />
      <ActionBarIcon
        title={isEditorToggled ? "Minimize" : "Maximize"}
        icon={
          isDarkTheme ? darkTheme.icons.maximize : lightTheme.icons.maximize
        }
        handleClick={handleMaximize}
        isDarkTheme={isDarkTheme}
      />
      {shouldShowNext ? (
        <ActionBarIcon
          title={"Next"}
          icon={isDarkTheme ? darkTheme.icons.next : lightTheme.icons.next}
          handleClick={handleNextThread}
          isDarkTheme={isDarkTheme}
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
  wasDocumentEdited: PropTypes.bool,
  isDarkTheme: PropTypes.bool.isRequired
};

export default EditorActionBar;
