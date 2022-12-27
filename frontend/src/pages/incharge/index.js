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
} from '@mui/material';
import Iconify from '../../components/iconify';
import EnhancedTable from 'src/components/SmartTable';
import EditCommonAction from 'src/components/Actions/EditAction';
import DeleteCommonAction from 'src/components/Actions/DeleteCommonAction';
import { useNavigate } from 'react-router-dom';
import InchargeServices from 'src/services/incharge';
import CommonActionModal from 'src/components/Modals/CommonActionModal';
import DeleteModal from 'src/components/Modals/CommonDeleteModal';
import {
  CLASS_OPTIONS, CLASS_DEFAULT_OPTION, SECTION_OPTIONS,
  SECTION_DEFAULT_OPTION, TERM_DEFAULT_OPTION, TERM_OPTIONS
} from 'src/utils/constant';
import { useToastify } from 'src/hooks/useToastify';

const Incharge = () => {

  const [inchargeList, setInchargeList] = useState([]);
  const initState = {
    openCommonModal: undefined,
    actionData: {},
  };
  const [state, setState] = React.useState(initState);

  const { showAlert } = useToastify();

  const formData = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Type Incharge Name",
      required: true,
      size: 6,
      disabled:true
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Type Incharge Email",
      required: true,
      size: 6,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Type Incharge Password",
      required: false,
      size: 6,
    },
    {
      type: "select",
      name: "status",
      size: 6,
      defaultValue: "false",
      label: "Status",
      options: [
        {
          title: "Active",
          value: "true",
        },
        {
          title: "Inactive",
          value: "false",
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",
    },
  ]

  const fetchData = async () => {
    try {
      const response = await InchargeServices.getAll();
      if (response.status == 200) {
        setInchargeList([...response.data])
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

  const onModalSubmit = async (values) => {

    const mode = state.openCommonModal;
    if (mode === "add") {
      try {
        const response = await InchargeServices.add(values);
        if (response.status == 200) {
          showAlert({
            open: true,
            message: 'Incharge Added Successfully',
            severity: 'success'
          });
          await fetchData();
          await closeModal();
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

    if (mode === "edit") {
      try {
        const response = await InchargeServices.update(values);
        if (response.status == 200) {
          await fetchData();
          await closeModal();
          showAlert({
            open: true,
            message: 'Incharge updated Successfully',
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

    if (mode === "import") {

    }
  };

  const onDeleteSubmit = async () => {
    try {
      const response = await InchargeServices.delete({ ...state.actionData });
      if (response.status == 200) {
        await fetchData();
        await closeModal();
        showAlert({
          open: true,
          message: 'Incharge Deleted Successfully.',
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

  const rowActions = [EditAction, DeleteAction];

  const tableHeaders = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Status", key: "status" }
  ];

  const deleteVariableTitle = undefined;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" gutterBottom>
          Incharge
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleRowActionClick("add", {})}
        >
          New Incharge
        </Button>
      </Stack>

      <EnhancedTable
        tableTitle={'Incharge'}
        headerComponents={[]}
        actions={rowActions}
        tableData={inchargeList}
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
          title={'Incharge'}
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

export default React.memo(Incharge);