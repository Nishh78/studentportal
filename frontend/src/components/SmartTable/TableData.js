import { TableBody, TableRow } from "@mui/material";
import MuiTableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import React from "react";
import * as ColumnLayouts from "./ColumnLayouts";
const TableData = ({ data, header, actions, handleCheckChange, actionPosition="end" }) => {
  const TableCell = styled(MuiTableCell)(({ theme }) => ({
    border: "none",
    padding: theme.spacing(0.5, 2),
    "&:first-child": {
      paddingLeft: theme.spacing(3),
    },
    "&:last-child": {
      paddingRight: theme.spacing(3),
    },
  }));

  const Nodata = () => (
    <TableCell colSpan="20" style={{ textAlign: "center", padding: 10 }}>
      {"No Data Available"}
    </TableCell>
  );

  const NoColumn = () => <i style={{ color: "rgba(0,0,0,0.5)" }}>N/A</i>;
  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const isItemSelected = isSelected(data.name);
  return (
    <TableBody>
      {data.length === 0 && <Nodata />}
      {data?.map((child, childindex) => {
        return (
          <TableRow key={childindex} hover tabIndex={-1} >
            {/* <TableCell>{++childindex}</TableCell> */}
            {isItemSelected && (
              <TableCell>
                <div class="checkbox">
                  <div class="custom-control" style={{ minHeight: 0 }}>
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      onChange={(e) => {
                        handleCheckChange(e.target.checked, childindex);
                      }}
                      checked={child.selected ? true : false}
                    />
                    <label class="custom-control-label"></label>
                  </div>
                </div>
              </TableCell>
            )}
            {(actionPosition === 'start' && actions?.length > 0 )&& (
              <TableCell
              valign="baseline"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {actions.map((Action, index) => {
                return <Action index={index} key={index} data={child} />;
              })}
            </TableCell>
            )}

            {header.map((head, headindex) => {
              const renderRow = head.renderRow;
              const data = renderRow ? renderRow(child) : child[head.key];
              if (head.type) {
                const CurrentType = ColumnLayouts[head.type];
                return (
                  <TableCell key={childindex + headindex} style={head.style}>
                    {data ? <CurrentType data={data} /> : <NoColumn />}
                  </TableCell>
                );
              }
              if (head.key === "status") {
                const CurrentType = ColumnLayouts["status"];
                return (
                  <TableCell key={childindex + headindex} style={head.style}>
                    <CurrentType data={data} />
                  </TableCell>
                );
              }
              if (head.key === "createdAt") {
                const CurrentType = ColumnLayouts["date"];
                return (
                  <TableCell key={childindex + headindex} style={head.style}>
                    {data ? <CurrentType data={data} /> : <NoColumn />}
                  </TableCell>
                );
              }
              return (
                <>
                  <TableCell key={headindex}>{data || <NoColumn />}</TableCell>
                </>
              );
            })}
            {(actions?.length > 0 && actionPosition !== 'start' )&& (
              <TableCell
                valign="baseline"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {actions.map((Action, index) => {
                  return <Action index={index} key={index} data={child} />;
                })}
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableData;
