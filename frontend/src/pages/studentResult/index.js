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
import AddCommonAction from 'src/components/Actions/AddAction';
import { useLoader } from 'src/hooks/useLoader';
import ViewCommonAction from 'src/components/Actions/ViewCommonAction';
import ExportCommonAction from 'src/components/Actions/ExportCommonAction';
import AddNursaryResult from './addNursaryResult';

const StudentResult = () => {

    const [studentList, setstudentList] = useState([]);
    const initState = {
        openCommonModal: undefined,
        actionData: {},
    };
    const [state, setState] = React.useState(initState);
    const [showAddResultPage, setShowAddResultPage] = React.useState({
        data: null,
        mode: null,
        type: null,
        show: false,
        _id: null
    });

    const { alert, showAlert, hideAlert } = useToastify();
    const { loading, setLoading } = useLoader();

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
        setLoading(true);
        setstudentList([]);
        try {
            let payload = Object.entries(values).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {})
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (loggedInUser && loggedInUser?._id) {
                payload['inchargeId'] = loggedInUser?._id;
                const response = await StudentServices.getALlStudentByIncharge(payload);
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
            } else {
                setstudentList([]);
                showAlert({
                    open: true,
                    message: 'Something went wrong, Please try again!.',
                    severity: 'error'
                });
            }

        } catch (error) {
            setstudentList([]);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const onModalSubmit = async (values) => {
        const mode = state.openCommonModal;

        if (mode === "edit") {
            try {
                const response = await StudentServices.update(values);
                if (response.status == 200) {
                    // await fetchData();
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
                // await fetchData();
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
        setShowAddResultPage({
            data: null,
            mode: null,
            type: null,
            show: false,
            _id: null
        });
    };

    const handleMarksSubmit = async (payload) => {
        if (showAddResultPage._id) {
            payload['studentId'] = showAddResultPage._id;
            try {
                setLoading(true);
                const response = await StudentServices.addStudentResult(payload);
                if (response.status == 200) {
                    // fetchData();
                    showAlert({
                        open: true,
                        message: 'Result added Successfully.',
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

    const handleExport = async (_id) => {
        try {
            setLoading(true);
            const response = await StudentServices.generateStudentResultPdf({ _id });
            if (response.status == 200 && response.data) {
                window.open(response.data, '_blank')
            } else {
                showAlert({
                    open: true,
                    message: 'Something went wrong, Please try again!.',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.log(error);
            showAlert({
                open: true,
                message: 'Something went wrong, Please try again!.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    const ExportAction = ({ data }) => {
        if (data.student_result.length == 0) return null;
        return (
            <ExportCommonAction onClick={() => handleExport(data._id)} />
        )
    }

    const NURSARY = ['Pre-Nursery', 'Nursery', 'LKG', 'UKG'];

    const ViewAction = ({ data }) => {
        return (
            <ViewCommonAction onClick={() => setShowAddResultPage({
                _id: data._id,
                mode: 'view',
                type: NURSARY.includes(data.class) ? 'NURSARY' : 'NO-NURSARY',
                data: data.student_result[0],
                show: true
            })} />
        )
    }

    const AddAction = ({data}) => {
        return (
            <AddCommonAction
                title="Add result"
                onClick={() => setShowAddResultPage({
                    data: null,
                    mode: 'add',
                    type: NURSARY.includes(data.class) ? 'NURSARY' : 'NO-NURSARY',
                    _id: data._id,
                    show: true
                })}
            />
        )
    }

    const ActionView = ({ data }) => {
        return data.student_result.length > 0 ? <ViewAction data={data} /> : <AddAction data={data} />
    }

    const DeleteAction = (action) => (
        <DeleteCommonAction
            onClick={() => handleRowActionClick("delete", action.data)}
        />
    );

    const rowActions = [ActionView];

    const tableHeaders = [
        // { title: "Action", key: "action", renderRow: (row) => { return row.student_result.length > 0 ? <ViewAction data={row} /> : <AddAction _id={row._id} /> } },
        { title: "Name", key: "name" },
        { title: "Father Name", key: "fathername" },
        { title: "Mother Name", key: "mothername" },
        { title: "Admin No.", key: "adminNo" },
        { title: "Mobile", key: "mobile" },
        { title: "Mobile Alternative", key: "mobile2" },
        { title: "Address", key: "address" },
        { title: "DOB", key: "dob" },
        { title: "Class", key: "class" },
        { title: "Section", key: "section" },
        { title: "Session", key: "session", renderRow: (row) => { return <span>{row.session ? SESSION_OPTIONS.find(el => el.value == row.session)?.title : ''}</span> } },
        { title: "Term", key: "term" },
        { title: "Created Date", key: "createdAt" },
    ];

    const deleteVariableTitle = undefined;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Student Result
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
                actionPosition={'start'}
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

            {showAddResultPage.show && (
                <CommonModal
                    title={`${showAddResultPage?.mode !== 'view' ? 'Add' : 'View'} Result`}
                    open={showAddResultPage.show}
                    onClose={() => closeModal()}
                    onSubmit={(e) => onModalSubmit(e)}
                    size={"md"}
                    fullScreen={true}
                    watchFields={[]}
                    onWatchChange={() => { }}
                    defaultValues={{}}
                >
                    {showAddResultPage?.type == 'NURSARY' ? (
                        <AddNursaryResult handleMarksSubmit={handleMarksSubmit} results={showAddResultPage.data} mode={showAddResultPage.mode} />
                    ) : (
                        <AddResult handleMarksSubmit={handleMarksSubmit} results={showAddResultPage.data} mode={showAddResultPage.mode} />
                    )}
                </CommonModal>
            )}
        </Container>
    )
}

export default React.memo(StudentResult);