import React from "react";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function getEntriesOptions(array, rowsPerPage) {
  return array.map((item, index) => {
    if (index <= rowsPerPage && index % rowsPerPage === 0) {
      return <option value={index + rowsPerPage}>{index + rowsPerPage}</option>;
    }
  });
  // const result =   new Array(Math.ceil(array.length / rowsPerPage))
  //   .fill()
  //   .map(_ => items.splice(0, n))
}

export function handleSearch(array, fieldName, searchQuery) {
  return array.filter((item, index) => {
    let filtered = fieldName.filter(element => {
      let searchele = JSON.stringify(item[element])
      return searchele?.toLowerCase().includes(searchQuery?.toLowerCase());
    });

    return filtered.length > 0 ? true : false
    // return item[element]?.toLowerCase().includes(searchQuery?.toLowerCase());

  });
}
