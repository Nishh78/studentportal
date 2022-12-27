import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Modal,
    Slide,
    Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({

    deleteBtn: {
        background: theme.palette.error.main,
        color: theme.palette.white,
        '&:hover': {
            background: theme.palette.error.main,
        }
    },
}));

const DeleteModal = (props) => {
    const classes = useStyles();

    return (

        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => props.onClose()}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle >Are you sure want to delete this?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    If you delete this record, you can't recover it
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => props.onClose()}>Cancel</Button>
                <Button variant="contained" className={classes.deleteBtn} onClick={() => props.onConfirm()}>Delete</Button>
            </DialogActions>
        </Dialog>

        // <Modal
        //     className={classes.root}
        //     open={props.open}
        //     onClose={() => props.onClose()}
        // >
        //     <Card className={classes.card}>
        //         <CardHeader
        //             title={<Typography variant="h6">{props.title}</Typography>}
        //         />
        //         <Divider />
        //         <CardContent>
        //             <Grid container justify="space-between" alignItems="center">
        //                 <Grid item>
        //                     <DeleteBtn />
        //                 </Grid>
        //                 <Grid item>
        //                     <CloseBtn />
        //                 </Grid>
        //             </Grid>
        //         </CardContent>
        //     </Card>
        // </Modal>
    );
};
export default DeleteModal;
