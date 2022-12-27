import React from "react";

const ImportCommonAction = ({ onClick, title }) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      class="btn btn-outline-primary waves-effect waves-light"
    >
      <i class="mdi mdi-file-import"></i> Import {title}
    </button>
  );
};

export default ImportCommonAction;
