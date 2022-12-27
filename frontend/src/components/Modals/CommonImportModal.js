import React from "react";
import { useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import SmartTable from "../SmartTable";

const CommonImportModal = ({
  open,
  onClose,
  title,
  onSubmit,
  data,
  headers,
}) => {
  const [selectedData, setSelectedData] = React.useState([]);
  const isLoading = useSelector((state) => state.util.spinner);

  React.useEffect(() => {
    setSelectedData(data);
  }, [data, open]);

  const submitData = () => {
    onSubmit(selectedData.filter((item) => item.selected));
  };

  return (
    <ModalContainer
      open={open}
      onClose={() => {
        onClose();
      }}
      title={`Import ${title}`}
    >
      <SmartTable
        tableData={selectedData}
        setTableData={(data) => setSelectedData(data)}
        headers={headers}
        sortable={true}
        selectable={true}
        paginated={true}
        searchByLabel={"Item name"}
        searchByField={"itemName"}
        rowsPerPage={5}
      />
      <div class="form-group mb-0">
        <button
          disabled={isLoading}
          onClick={() => submitData()}
          class="btn btn-gradient-primary waves-effect waves-light"
        >
          Submit
        </button>
        <button
          type="reset"
          class="btn btn-gradient-danger waves-effect ml-3"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
};

export default CommonImportModal;
