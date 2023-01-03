import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, InputBase, lighten, TableSortLabel } from "@mui/material";
import TableData from "./TableData";
import SearchIcon from '@material-ui/icons/Search';
import {
  getComparator,
  handleSearch,
  stableSort,
} from "./functions";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  maxHeight: '45px !important',
  borderRadius: theme.palette.radius.base,
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  marginLeft: 0,
  width: 'auto',

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.5),
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.grey[500],
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5),
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      width: '23ch',
    },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function EnhancedTableHead(props) {
  const {
    classes,
    sortable,
    header,
    orderBy, order,
    onRequestSort,
  } = props;
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell className={classes.headCell} width="5%" >
          No.
        </TableCell> */}
        {header.map((headCell) => (
          <TableCell
            key={headCell.title}
            align={headCell.numeric ? "right" : "left"}
            className={classes.headCell}
            sortDirection={orderBy === headCell.key ? order : false}
            style={headCell.style}
          >
            {sortable && <TableSortLabel
              active={orderBy === headCell.key}
              direction={orderBy === headCell.key ? order : "asc"}
              onClick={(event) => createSortHandler(event, headCell.key)}
            >
              {headCell.title}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
            }
          </TableCell>
        ))}
        {props.showActionHeader && (
          <TableCell className={classes.headCell}>Actions</TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    fontSize: theme.palette.fontSizes.md,
    fontWeight: theme.palette.fontWeights.semiBold
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Typography
      className={classes.title}
    >
      {props.title}
    </Typography>
  )
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.palette.radius.medium
  },
  tableTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5, 2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  headCell: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.inverted,
    fontSize: theme.palette.fontSizes.base,
    fontWeight: theme.palette.fontSizes.medium,
    border: 'none',
    '&:first-child': {
      boxShadow: 'rgb(255 255 255) 8px 0px 0px inset',
      borderTopLeftRadius: theme.palette.radius.base,
      borderBottomLeftRadius: theme.palette.radius.base,
      paddingLeft: theme.spacing(3)
    },
    '&:last-child': {
      boxShadow: 'rgb(255 255 255) -8px 0px 0px inset',
      borderTopRightRadius: theme.palette.radius.base,
      borderBottomRightRadius: theme.palette.radius.base,
      paddingRight: theme.spacing(3)
    }
    // fontWeight: 600,
  },
}));

export default function EnhancedTable(props) {
  const { setTableData, searchByLabel,
    searchByField = [], tableData = [], sortable } = props
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState();
  const [rows, setRows] = React.useState(tableData || []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event) {
      setTableData(
        tableData.map((item) => {
          return { ...item, selected: true };
        })
      );
    } else {
      setTableData(
        tableData.map((item) => {
          return { ...item, selected: false };
        })
      );
    }
  };

  const handleCheckChange = (value, index) => {
    let myIndex = index;

    if (page > 0) {
      myIndex = page * rowsPerPage + index;
    }

    let newData = tableData;

    newData[myIndex].selected = value;

    setTableData([...newData]);
  };

  const handleChangePage = (event, newPage) => {
    console.log('handleChangePage', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    if (!searchQuery) {
      setRows(tableData);
    } else {
      setRows(handleSearch(tableData, searchByField, searchQuery));
    }

    if (!props.paginated) {
      setRowsPerPage(props.perPageRows || tableData.length);
    }
  }, [tableData]);
  React.useEffect(() => {
    if (searchByField.length > 0 && searchQuery) {
      setRows(handleSearch(tableData, searchByField, searchQuery));
    } else {
      setRows(tableData);
    }
  }, [searchQuery]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0} variant={props?.variant}>
        <Box className={classes.tableTitleContainer}>

          {/* <EnhancedTableToolbar
            title={props.tableTitle || "Table Title"}
            numSelected={selected.length}
            {...props}
          /> */}
          {searchByField.length > 0 && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={`Search by ${searchByLabel}`}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          )}
        </Box>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              sortable={sortable}
              header={props.header}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              showActionHeader={props?.actions ? true : false}
            />

            <TableData
              actions={props.actions}
              header={props.header}
              handleCheckChange={(value, index) => {
                handleCheckChange(value, index);
              }}
              data={stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
            />
          </Table>
        </TableContainer>
        {rows.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[10, 50, 100 || rows.length]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}
