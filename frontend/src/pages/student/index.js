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
import { useLoader } from 'src/hooks/useLoader';
import { read, utils, writeFile } from 'xlsx';
import CommonFilterModal from 'src/components/Modals/CommonFilter';
import AddCommonAction from 'src/components/Actions/AddAction';
import ViewCommonAction from 'src/components/Actions/ViewCommonAction';
import CommonModal from 'src/components/Modals/commonModal';
import AddResult from '../studentResult/addResult';
import InchargeServices from 'src/services/incharge';

const Student = () => {

  const [studentList, setstudentList] = useState([]);
  const initState = {
    openCommonModal: undefined,
    actionData: {},
  };
  const [state, setState] = React.useState(initState);
  const [showAddResultPage, setShowAddResultPage] = React.useState({
    data: null,
    mode: null,
    show: false,
    _id: null
  });
  const [inchargeOptions, setInchargeOptions] = useState([]);

  console.log('showAddResultPage', showAddResultPage);

  const { alert, showAlert, hideAlert } = useToastify();
  const { loading, setLoading } = useLoader();

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
      name: "inchargeId",
      size: 12,
      label: "Incharge",
      options: inchargeOptions,
      required: false,
      optionLabelProp: "name",
      optionValueProp: "_id",
    },
    {
      type: "select",
      name: "session",
      label: "Session",
      size: 3,
      options: SESSION_OPTIONS,
      optionLabelProp: "title",
      optionValueProp: "value",
      required: false
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

  const fetchData = async (payload = {}) => {
    setstudentList([]);
    try {
      const response = await StudentServices.getAll(payload);
      if (response.status == 200 && response.data.length > 0) {
        setstudentList([...response.data]);
        showAlert({
            open: true,
            message: 'Record found!',
            severity: 'success'
        });
    } else {
        setstudentList([]);
        showAlert({
            open: true,
            message: 'No record found!',
            severity: 'error'
        });
    }
    } catch (error) {
      setstudentList([]);
      console.log(error);
    }
  };

  const fetchAllSimpleIncharge = async () => {
    try {
      const response = await InchargeServices.getAllSimpleIncharge();
      if (response.status == 200) {
        setInchargeOptions([...response.data])
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
    const payload = Object.entries(values).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {})
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

  const handleMarksUpdate = async (payload) => {
    if (showAddResultPage._id) {
      payload['_id'] = showAddResultPage._id;
      try {
        setLoading(true);
        const response = await StudentServices.updateStudentResult(payload);
        if (response.status == 200) {
          fetchData();
          showAlert({
            open: true,
            message: 'Result Updated Successfully.',
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
      } finally {
        closeModal();
        setLoading(false);
      }
    } else {
      closeModal();
      showAlert({
        open: true,
        message: 'Something went wrong, Please try again!.',
        severity: 'error'
      });
    }

  }

  const closeModal = async () => {
    setState(initState);
    setShowAddResultPage({
      data: null,
      mode: null,
      show: false,
      _id: null
    });
  };

  const ViewAction = ({ data }) => {
    return (
      <ViewCommonAction onClick={() => setShowAddResultPage({
        _id: data._id,
        mode: 'view',
        data: data.student_result[0],
        show: true
      })} />
    )
  }

  const EditAction = ({ data }) => {
    return (
      <EditCommonAction
        title="Edit result"
        onClick={() => setShowAddResultPage({
          data: data.student_result[0],
          mode: 'add',
          _id: data.student_result[0]._id,
          show: true
        })}
      />
    )
  }

  const DeleteAction = (action) => (
    <DeleteCommonAction
      onClick={() => handleRowActionClick("delete", action.data)}
    />
  );

  useEffect(() => {
    fetchData();
    fetchAllSimpleIncharge();
  }, []);

  const rowActions = [];

  const tableHeaders = [
    { title: "Action", key: "action", renderRow: (row) => { return row.student_result.length > 0 ? <EditAction data={row} /> : <></> } },
    { title: "Name", key: "name" },
    { title: "Father Name", key: "fathername" },
    { title: "Mother Name", key: "mothername" },
    { title: "Admin No.", key: "adminNo" },
    { title: "Mobile", key: "mobile" },
    { title: "Mobile Alternative", key: "mobile2" },
    { title: "Address", key: "address" },
    { title: "DOB", key: "dob" },
    { title: "Session", key: "session", renderRow: (row) => { return <span>{row.session ? SESSION_OPTIONS.find(el => el.value == row.session)?.title : ''}</span> } },
    { title: "Class", key: "class" },
    { title: "Section", key: "section" },
    { title: "Term", key: "term" },
    { title: "Created Date", key: "createdAt" },
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
        searchByLabel={"Name, Admin No"}
        searchByField={['name', 'adminNo']}
        rowsPerPage={5}
      />

      <DeleteModal
        size="md"
        open={["delete"].includes(state.openCommonModal)}
        title={deleteVariableTitle && state?.actionData[deleteVariableTitle]}
        onClose={() => closeModal()}
        onConfirm={() => onDeleteSubmit()}
      />

      {(state.openCommonModal && formData) && (
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


      {showAddResultPage.show && (
        <CommonModal
          title={`${showAddResultPage?.mode !== 'view' ? 'Edit' : 'View'} Result`}
          open={showAddResultPage.show}
          onClose={() => closeModal()}
          onSubmit={(e) => onModalSubmit(e)}
          size={"md"}
          fullScreen={true}
          watchFields={[]}
          onWatchChange={() => { }}
          defaultValues={{}}
        >
          <AddResult handleMarksSubmit={handleMarksUpdate} results={showAddResultPage.data} mode={showAddResultPage.mode} />
        </CommonModal>
      )}
    </Container>
  )
}

export default React.memo(Student);