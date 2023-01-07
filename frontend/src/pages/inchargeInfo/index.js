import React, { useState, useEffect } from 'react';
import {
    Stack,
    Button,
    Container,
    Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import EnhancedTable from 'src/components/SmartTable';
import EditCommonAction from 'src/components/Actions/EditAction';
import DeleteCommonAction from 'src/components/Actions/DeleteCommonAction';
import InchargeInfoServices from 'src/services/inchargeInfo';
import InchargeServices from 'src/services/incharge';
import CommonActionModal from 'src/components/Modals/CommonActionModal';
import DeleteModal from 'src/components/Modals/CommonDeleteModal';
import {
    CLASS_OPTIONS, CLASS_DEFAULT_OPTION, SECTION_OPTIONS,
    SECTION_DEFAULT_OPTION, TERM_DEFAULT_OPTION, TERM_OPTIONS,
    SESSION_OPTIONS
} from 'src/utils/constant';
import { useToastify } from 'src/hooks/useToastify';

const InchargeInfo = () => {

    const [inchargeList, setInchargeList] = useState([]);
    const [inchargeOptions, setInchargeOptions] = useState([]);
    const initState = {
        openCommonModal: undefined,
        actionData: {},
    };
    const [state, setState] = React.useState(initState);

    const { showAlert } = useToastify();

    const formData = [
        {
            type: "select",
            name: "session",
            label: "Session",
            size: 3,
            options: SESSION_OPTIONS,
            optionLabelProp: "title",
            optionValueProp: "value",
            required: true
        },
        {
            type: "select",
            name: "class",
            label: "Class",
            required: true,
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
            required: true,
            size: 3,
        },
        {
            type: "select",
            name: "term",
            label: "Term",
            options: TERM_OPTIONS.map(item => { return { title: item, value: item } }),
            optionLabelProp: "title",
            optionValueProp: "value",
            required: true,
            size: 3,
        },
        {
            type: "select",
            name: "inchargeId",
            size: 6,
            label: "Incharge",
            options: inchargeOptions,
            required: true,
            optionLabelProp: "name",
            optionValueProp: "_id",
          },
    ]

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

    const fetchData = async () => {
        try {
            const response = await InchargeInfoServices.getAll();
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
                const response = await InchargeInfoServices.add(values);
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
                const response = await InchargeInfoServices.update(values);
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
    };

    const onDeleteSubmit = async () => {
        try {
            const response = await InchargeInfoServices.delete({ ...state.actionData });
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
        fetchAllSimpleIncharge();
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
        { title: "Incharge", key: "inchargeId", renderRow: (row) => {return <span>{row.inchargeId.name}</span> } },
        { title: "Session", key: "session", renderRow: (row) => {return <span>{row.session ? SESSION_OPTIONS.find(el => el.value == row.session)?.title : '' }</span> } },
        { title: "Class", key: "class" },
        { title: "Section", key: "section" },
        { title: "Term", key: "term" },
    ];

    const deleteVariableTitle = undefined;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Incharge Info
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => handleRowActionClick("add", {})}
                >
                    Add Incharge Info
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
                searchByField={['inchargeId']}
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
                    title={'Incharge Info'}
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

export default React.memo(InchargeInfo);