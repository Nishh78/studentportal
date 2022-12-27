import React from "react";

const styles = {
  th: {
    cursor: "pointer",
  },
  button: {
    boxShadow: "none",
    outline: "none",
    backgroundColor: "transparent",
    border: "none",
  },
};
const TableHeading = ({
  data,
  hasActions,
  onRequestSort,
  selectable,
  onSelectAll,
  sortable,
  order,
}) => {
  const createSortHandler = (property) => (event) => {
    sortable && onRequestSort(event, property);
  };
  const [allChecked, setAllChecked] = React.useState();

  return (
    <thead>
      <tr>
        {selectable && (
          <th>
            <div class="checkbox">
              <div class="custom-control" style={{ minHeight: 0 }}>
                <input
                  type="checkbox"
                  class="custom-control-input"
                  checked={allChecked}
                  onChange={(e) => {
                    onSelectAll(e.target.checked);
                    setAllChecked(e.target.checked);
                  }}
                />
                <label class="custom-control-label"></label>
              </div>
            </div>
          </th>
        )}
        {data?.map((child, index) => {
        
          return (
            <th class="sorting" style={styles.th}>
              {sortable && (
                <i
                  class={`mdi mdi-arrow-expand-${order === "asc" ? "up" : "down"
                    }`}
                ></i>
              )}
              <button
                style={styles.button}
                onClick={createSortHandler(child.key)}
              >
             {child.title}
              </button>
            </th>
          );
        })}
        {hasActions && <th>Actions</th>}
      </tr>
    </thead>
  );
};

export default TableHeading;
