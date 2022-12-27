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
import AddResult from './addResult';
import CommonModal from 'src/components/Modals/commonModal';
import AddCommonAction  from 'src/components/Actions/AddAction';


const StudentResult = () => {

    const [studentList, setstudentList] = useState([]);
    const initState = {
        openCommonModal: undefined,
        actionData: {},
    };
    const [state, setState] = React.useState(initState);
    const [showAddResultPage, setShowAddResultPage] = React.useState(false);

    const { alert, showAlert, hideAlert } = useToastify();

    const formData = [
        {
            type: "number",
            name: "english",
            label: "English",
            placeholder: "Type English Mark",
            required: true,
            size: 3,
        },
        {
            type: "number",
            name: "hindi",
            label: "Hindi",
            placeholder: "Type Hindi Mark",
            required: true,
            size: 3,
        },
        {
            type: "number",
            name: "maths",
            label: "Maths",
            placeholder: "Type Maths Mark",
            required: true,
            size: 3,
        },
        {
            type: "number",
            name: "science",
            label: "Science",
            placeholder: "Type Science Mark",
            required: true,
            size: 3,
        },
        {
            type: "number",
            name: "socialStudies",
            label: "Social Studies",
            placeholder: "Type Social Studies Mark",
            required: true,
            size: 3,
        },
        {
            type: "number",
            name: "computer",
            label: "Computer",
            placeholder: "Type Computer Name",
            required: true,
            size: 3,
        },
        {
            type: "number",
            name: "punjabi",
            label: "Punjabi",
            placeholder: "Type Incharge Name",
            required: false,
            size: 3,
        },
        {
            type: "number",
            name: "sanskrit",
            label: "Sanskrit",
            placeholder: "Type Sanskrit Name",
            required: false,
            size: 3,
        }
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
            required: true,
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
        }
    ]

    const fetchData = async (payload = {}) => {
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

    const onFilterSubmit = async (values) => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (loggedInUser && loggedInUser?._id) {
                values['inchargeId'] = loggedInUser?._id;
                const response = await StudentServices.getALlStudentByIncharge(values);
                if (response.status == 200) {
                    setstudentList([...response.data])
                }
            } else {
                showAlert({
                    open: true,
                    message: 'Something went wrong, Please try again!.',
                    severity: 'error'
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const onModalSubmit = async (values) => {
        const mode = state.openCommonModal;

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
        setShowAddResultPage(false);
    };


    const AddAction = (action) => (
        <AddCommonAction
            onClick={() => setShowAddResultPage(true)}
        />
    )

    const DeleteAction = (action) => (
        <DeleteCommonAction
            onClick={() => handleRowActionClick("delete", action.data)}
        />
    );

    const rowActions = [AddAction];

    const tableHeaders = [
        // { title: "Action", key: "action", renderRow: (row) => { return <span>{row.inchargeId.name}</span> } },
        { title: "Name", key: "name" },
        { title: "Father Name", key: "fathername" },
        { title: "Mother Name", key: "mothername" },
        { title: "Admin No.", key: "adminNo" },
        // { title: "Mobile", key: "mobile" },
        // { title: "Mobile Alternative", key: "mobile2" },
        // { title: "Address", key: "address" },
        // { title: "DOB", key: "dob" },
        { title: "Class", key: "class" },
        { title: "Section", key: "section" },
        { title: "Session", key: "session" },
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
                actions={rowActions}
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

            {showAddResultPage && (
                <CommonModal
                    title={'Add Result'}
                    open={showAddResultPage}
                    onClose={() => closeModal()}
                    onSubmit={(e) => onModalSubmit(e)}
                    size={"md"}
                    fullScreen={true}
                    watchFields={[]}
                    onWatchChange={() => { }}
                    defaultValues={{}}
                >
                    <AddResult />
                </CommonModal>
            )}
        </Container>
    )
}

export default React.memo(StudentResult);