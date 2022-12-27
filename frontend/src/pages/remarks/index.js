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
import RemarkServices from 'src/services/remark';
import CommonActionModal from 'src/components/Modals/CommonActionModal';
import DeleteModal from 'src/components/Modals/CommonDeleteModal';
import { useToastify } from 'src/hooks/useToastify';

const Remark = () => {

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
            name: "title",
            label: "Title",
            placeholder: "Type Title",
            required: true,
            size: 6,
        }
    ]

    const fetchData = async () => {
        try {
            const response = await RemarkServices.getAll();
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
                const response = await RemarkServices.add(values);
                if (response.status == 200) {
                    showAlert({
                        open: true,
                        message: 'Remark Added Successfully',
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
                const response = await RemarkServices.update(values);
                if (response.status == 200) {
                    await fetchData();
                    await closeModal();
                    showAlert({
                        open: true,
                        message: 'Remark updated Successfully',
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
            const response = await RemarkServices.delete({ ...state.actionData });
            if (response.status == 200) {
                await fetchData();
                await closeModal();
                showAlert({
                    open: true,
                    message: 'Remark Deleted Successfully.',
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
        { title: "Title", key: "title" },
    ];

    const deleteVariableTitle = undefined;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Remarks
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => handleRowActionClick("add", {})}
                >
                    New Remark
                </Button>
            </Stack>

            <EnhancedTable
                tableTitle={'Remark'}
                headerComponents={[]}
                actions={rowActions}
                tableData={inchargeList}
                header={tableHeaders}
                sortable={true}
                paginated={true}
                searchByLabel={"title"}
                searchByField={['title']}
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
                    title={'Remark'}
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

export default React.memo(Remark);