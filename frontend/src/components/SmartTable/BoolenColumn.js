import React from "react";

const StatusColumn = ({ data }) => {
  const True =
    typeof data === "string"
      ? data === "true"
        ? true
        : false
      : data
      ? true
      : false;

  return (
    <div>
      <span
        class={`badge badge-md badge-boxed badge-soft-${
          True ? `success` : "danger"
        }`}
      >
        {True ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

export default StatusColumn;
