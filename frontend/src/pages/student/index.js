import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TableRow,
  Box
} from '@mui/material';
import Iconify from '../../components/iconify';
import EnhancedTable from 'src/components/SmartTable';
import EditCommonAction from 'src/components/Actions/EditAction';
import DeleteCommonAction from 'src/components/Actions/DeleteCommonAction';
import { useNavigate } from 'react-router-dom';
import StudentServices from 'src/services/student';
import CommonActionModal from 'src/components/Modals/CommonActionModal';
import DeleteModal from 'src/components/Modals/CommonDeleteModal';
import {
  CLASS_OPTIONS, CLASS_DEFAULT_OPTION, SECTION_OPTIONS,
  SECTION_DEFAULT_OPTION, TERM_DEFAULT_OPTION, TERM_OPTIONS, SESSION_OPTIONS, SESSION_DEFAULT_OPTIONS
} from 'src/utils/constant';
import { useToastify } from 'src/hooks/useToastify';
import { read, utils, writeFile } from 'xlsx';
import CommonFilterModal from 'src/components/Modals/CommonFilter';


const Student = () => {

  const [studentList, setstudentList] = useState([]);
  const initState = {
    openCommonModal: undefined,
    actionData: {},
  };
  const [state, setState] = React.useState(initState);

  const { alert, showAlert, hideAlert } = useToastify();

  const formData = [
    {
      type: "select",
      name: "session",
      label: "Session",
      required: true,
      size: 6,
      defaultValue: SESSION_DEFAULT_OPTIONS,
      options: SESSION_OPTIONS,
      optionLabelProp: "title",
      optionValueProp: "value",
    },
    {
      type: "select",
      name: "class",
      label: "Class",
      required: true,
      size: 6,
      options: CLASS_OPTIONS.map(item => { return { title: item, value: item } }),
      optionLabelProp: "title",
      optionValueProp: "value",
    },
    {
      type: "select",
      name: "section",
      label: "Section",
      options: SECTION_OPTIONS.map(item => { return { title: item, value: item } }),
      optionLabelProp: "title",
      optionValueProp: "value",
      required: true,
      size: 6,
    },
    {
      type: "select",
      name: "term",
      label: "Term",
      options: TERM_OPTIONS.map(item => { return { title: item, value: item } }),
      optionLabelProp: "title",
      optionValueProp: "value",
      required: true,
      size: 6,
    },
    {
      type: "file",
      name: "studentsFile",
      label: "Upload xlsx File",
      placeholder: "Upload xlsx File",
      required: true,
      size: 12,
    },
  ]

  const filterFormData = [
    {
      type: "select",
      name: "session",
      label: "Session",
      size: 3,
      options: SESSION_OPTIONS,
      optionLabelProp: "title",
      optionValueProp: "value",
      required:false
    },
    {
      type: "select",
      name: "class",
      label: "Class",
      required: false,
      size: 3,
      options: CLASS_OPTIONS.map(item => { return { title: item, value: item } }),
      optionLabelProp: "title",
      optionValueProp: "value",
    },
    {
      type: "select",
      name: "section",
      label: "Section",
      options: SECTION_OPTIONS.map(item => { return { title: item, value: item } }),
      optionLabelProp: "title",
      optionValueProp: "value",
      required: false,
      size: 3,
    },
    {
      type: "select",
      name: "term",
      label: "Term",
      options: TERM_OPTIONS.map(item => { return { title: item, value: item } }),
      optionLabelProp: "title",
      optionValueProp: "value",
      required: false,
      size: 3,
    }
  ]

  const fetchData = async (payload={}) => {
    try {
      const response = await StudentServices.getAll(payload);
      if (response.status == 200) {
        setstudentList([...response.data])
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowActionClick = (mode, data) => {
    setState({
      ...state,
      openCommonModal: mode,
      actionData: data,
    });
  };

  const convertxlsxFileToList = (file, batchEl) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            let list = [];
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            list = rows.map((row) => {
              return {
                name: row.Name,
                fathername: row["Father's Name"],
                mothername: row["Mother's Name"],
                mobile: Number(row["Phone_No"]) || null,
                mobile2: Number(row["Phone_No2"]) || null,
                address: row["Address1"] || null,
                dob: row["DOB"],
                adminNo: row["Adm.No."],
                ...batchEl
              }
            });
            resolve(list);
          }
        }
        reader.readAsArrayBuffer(file);
      }
    })
  }

  const onFilterSubmit = async (values) => {
    const payload = Object.entries(values).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {})
    await fetchData(payload);
  }
  const onModalSubmit = async ({ studentsFile, ...rest }) => {
    const values = await convertxlsxFileToList(studentsFile[0], rest);
    const mode = state.openCommonModal;
    if (mode === "add") {
      try {
        const response = await StudentServices.add(values);
        if (response.status == 200) {
          await fetchData();
          await closeModal();
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (mode === "edit") {
      try {
        const response = await StudentServices.update(values);
        if (response.status == 200) {
          await fetchData();
          await closeModal();
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (mode === "import") {

    }
  };

  const onDeleteSubmit = async () => {
    try {
      const response = await StudentServices.delete({ ...state.actionData });
      if (response.status == 200) {
        await fetchData();
        await closeModal();
        showAlert({
          open: true,
          message: 'student Deleted Successfully.',
          severity: 'success'
        });
      }
    } catch (error) {
      showAlert({
        open: true,
        message: 'Something went wrong, Please try again!.',
        severity: 'error'
      });
      console.log(error);
    }
  }

  const closeModal = async () => {
    setState(initState);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const EditAction = (action) => {
    return (

      <EditCommonAction
        onClick={() => handleRowActionClick("edit", action.data)}
      />
    );
  }

  const DeleteAction = (action) => (
    <DeleteCommonAction
      onClick={() => handleRowActionClick("delete", action.data)}
    />
  );

  const rowActions = [];

  const tableHeaders = [
    { title: "Name", key: "name" },
    { title: "Father Name", key: "fathername" },
    { title: "Mother Name", key: "mothername" },
    { title: "Admin No.", key: "adminNo" },
    // { title: "Mobile", key: "mobile" },
    // { title: "Mobile Alternative", key: "mobile2" },
    // { title: "Address", key: "address" },
    // { title: "DOB", key: "dob" },
    { title: "Session", key: "session" },
    { title: "Class", key: "class" },
    { title: "Section", key: "section" },
    { title: "Term", key: "term" },
    { title: "Created Date", key: "createdAt" }
  ];

  const deleteVariableTitle = undefined;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" gutterBottom>
          Students
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleRowActionClick("add", {})}
        >
          Import student
        </Button>
      </Stack>

      {filterFormData && (
        <CommonFilterModal
          formData={filterFormData}
          mode={state.openCommonModal}
          onSubmit={(e) => onFilterSubmit(e)}
          data={state.actionData}
          watchFields={[]}
          onWatchChange={() => { }}
          defaultValues={{}}
        />
      )}

      <EnhancedTable
        tableTitle={'student'}
        headerComponents={[]}
        actions={false}
        tableData={studentList}
        header={tableHeaders}
        sortable={true}
        paginated={true}
        searchByLabel={"name"}
        searchByField={['name']}
        rowsPerPage={5}
      />

      <DeleteModal
        size="md"
        open={["delete"].includes(state.openCommonModal)}
        title={deleteVariableTitle && state?.actionData[deleteVariableTitle]}
        onClose={() => closeModal()}
        onConfirm={() => onDeleteSubmit()}
      />

      {formData && (
        <CommonActionModal
          formData={formData}
          title={'student'}
          open={["add", "edit"].includes(state.openCommonModal)}
          onClose={() => closeModal()}
          mode={state.openCommonModal}
          onSubmit={(e) => onModalSubmit(e)}
          data={state.actionData}
          size={"md"}
          fullScreen={false}
          watchFields={[]}
          onWatchChange={() => { }}
          defaultValues={{}}
        />
      )}
    </Container>
  )
}

export default React.memo(Student);