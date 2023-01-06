import React, { useState, useEffect } from 'react';
import {
    Stack,
    Button,
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    TextField,
    Accordion as MuiAccordion,
    AccordionDetails,
    AccordionSummary,
    MenuItem
} from '@mui/material';
import ExpandMoreIcon from "@material-ui/icons/Expand";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { styled } from '@material-ui/core/styles';
import RemarkServices from "../../services/remark";
import KeyboardArrowRightOutlined from "@material-ui/icons/KeyboardArrowRightOutlined";
import './index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: 20,
        borderRadius: theme.palette.radius.medium
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    button: {
        margin: theme.spacing(1)
    },
    field: {
        margin: theme.spacing(1)
    }
}));

const validationSchema = Yup.object().shape({
    english: Yup.object().shape({
        to_write: Yup.string().required("Periodic Test is required"),
        to_read_identify: Yup.string().required("Class Test is required"),
        to_narrate: Yup.string().required("Subject Activity is required"),
        to_recite_poem: Yup.string().required("Subject Activity is required"),
        to_converse: Yup.string().required("March Exam is required"),
    }),
    hindi: Yup.object().shape({
        to_write: Yup.string().required("Periodic Test is required"),
        to_read_identify: Yup.string().required("Class Test is required"),
        to_narrate: Yup.string().required("Subject Activity is required"),
        to_recite_poem: Yup.string().required("Subject Activity is required"),
        to_converse: Yup.string().required("March Exam is required"),
    }),
    maths: Yup.object().shape({
        to_write: Yup.string().required("Periodic Test is required"),
        recognises_numbers: Yup.string().required("Class Test is required")
    }),
    creativeSkills: Yup.object().shape({
        recognises_colors: Yup.string().required("Periodic Test is required"),
        drawing_coloring: Yup.string().required("Class Test is required"),
        playing_games: Yup.string().required("Subject Activity is required"),
        dancing: Yup.string().required("March Exam is required"),
    }),
    confidence: Yup.string().required("Periodic Test is required"),
    responsibility: Yup.string().required("Periodic Test is required"),
    curiosity: Yup.string().required("Periodic Test is required"),
    obedience: Yup.string().required("Periodic Test is required"),
    concentration: Yup.string().required("Periodic Test is required"),
    social_interaction: Yup.string().required("Periodic Test is required"),
    neatness: Yup.string().required("Periodic Test is required"),
    remarkId: Yup.string().required("Remark is required"),
});


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        // borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


const AddNursaryResult = ({
    results,
    mode,
    handleMarksSubmit
}) => {

    console.log('results---', results);

    const classes = useStyles();

    const initialState = {
        english: {
            to_write: '',
            to_read_identify: '',
            to_narrate: '',
            to_recite_poem: '',
            to_converse: '',
        },
        hindi: {
            to_write: '',
            to_read_identify: '',
            to_narrate: '',
            to_recite_poem: '',
            to_converse: '',
        },
        maths: {
            to_write: '',
            recognises_numbers: ''
        },
        creativeSkills: {
            recognises_colors: '',
            drawing_coloring: '',
            playing_games: '',
            dancing: '',
        },
        confidence: '',
        responsibility: '',
        curiosity: '',
        obedience: '',
        concentration: '',
        social_interaction: '',
        neatness: '',
        remarkId: '',
    }

    const [expanded, setExpanded] = useState(false);
    const [remarks, setRemarks] = useState([]);
    const [marksInfo, setMarksInfo] = useState(initialState);


    const handlePageSubmit = async (values) => {
        await handleMarksSubmit(values)
    }

    const fetchRemark = async () => {
        try {
            const response = await RemarkServices.getAll();
            if (response.status == 200) {
                setRemarks([...response.data])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRemark();
    }, []);

    useEffect(() => {
        if (results) {
            setMarksInfo({ ...results });
        }
    }, [results]);

    console.log('marksInfo', marksInfo);


    return (
        <React.Fragment>
            <div className={mode === 'view' ? 'div-disabled' : ''}>
                <Accordion sx={{ background: expanded === 'panel1' && '#D1E9FC' }} expanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Acedemic Assessment / Personality Assessment
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <Paper className={classes.paper} elevation={0} >
                                <Box >
                                    <div className={classes.container}>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={marksInfo}
                                            validationSchema={validationSchema}
                                            onSubmit={async (values, actions) => {
                                                await handlePageSubmit(values);
                                            }}
                                        >
                                            {({
                                                touched,
                                                errors,
                                                values,
                                                isSubmitting,
                                                isValid,
                                                setFieldValue,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit
                                            }) => {
                                                console.log('values', values);
                                                return (
                                                    <form onSubmit={handleSubmit}>
                                                        <h3>English</h3>
                                                        <div>
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'english.to_write'}
                                                                // error={Boolean( touched.english.to_write && errors.english.to_write)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.english.to_write}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to read & identify"
                                                                name={'english.to_read_identify'}
                                                                // error={Boolean(touched.english.to_read_identify && errors.english.to_read_identify)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.english.to_read_identify}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to narrate"
                                                                name={'english.to_narrate'}
                                                                // error={Boolean(touched.english.to_narrate && errors.english.to_narrate)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.english.to_narrate}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to recite a poem"
                                                                name={'english.to_recite_poem'}
                                                                // error={Boolean(touched.english.to_recite_poem && errors.english.to_recite_poem)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.english.to_recite_poem}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to converse"
                                                                name={'english.to_converse'}
                                                                // error={Boolean(touched.english.to_converse && errors.english.to_converse)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.english.to_converse}

                                                            />
                                                        </div>

                                                        <h3>Hindi</h3>
                                                        <div>
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'hindi.to_write'}
                                                                // error={Boolean( touched.hindi.to_write && errors.hindi.to_write)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.hindi.to_write}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to read & identify"
                                                                name={'hindi.to_read_identify'}
                                                                // error={Boolean(touched.hindi.to_read_identify && errors.hindi.to_read_identify)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.hindi.to_read_identify}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to narrate"
                                                                name={'hindi.to_narrate'}
                                                                // error={Boolean(touched.hindi.to_narrate && errors.hindi.to_narrate)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.hindi.to_narrate}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to recite a poem"
                                                                name={'hindi.to_recite_poem'}
                                                                // error={Boolean(touched.hindi.to_recite_poem && errors.hindi.to_recite_poem)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.hindi.to_recite_poem}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to converse"
                                                                name={'hindi.to_converse'}
                                                                // error={Boolean(touched.hindi.to_converse && errors.hindi.to_converse)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.hindi.to_converse}

                                                            />
                                                        </div>

                                                        <h3>Maths</h3>
                                                        <div>
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'maths.to_write'}
                                                                // error={Boolean( touched.maths.to_write && errors.maths.to_write)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.maths.to_write}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to recognise numners"
                                                                name={'maths.recognises_numbers'}
                                                                // error={Boolean(touched.maths.recognises_numbers && errors.maths.recognises_numbers)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.maths.recognises_numbers}
                                                                sx={{ width: 300 }}

                                                            />
                                                        </div>


                                                        <h3>Creative skills</h3>
                                                        <div>
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'creativeSkills.recognises_colors'}
                                                                // error={Boolean( touched.creativeSkills.recognises_colors && errors.creativeSkills.recognises_colors)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.creativeSkills.recognises_colors}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to recognise numners"
                                                                name={'creativeSkills.drawing_coloring'}
                                                                // error={Boolean(touched.creativeSkills.drawing_coloring && errors.creativeSkills.drawing_coloring)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.creativeSkills.drawing_coloring}
                                                                sx={{ width: 300 }}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'creativeSkills.playing_games'}
                                                                // error={Boolean( touched.creativeSkills.playing_games && errors.creativeSkills.playing_games)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.creativeSkills.playing_games}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Enjoys dancing"
                                                                name={'creativeSkills.dancing'}
                                                                // error={Boolean(touched.creativeSkills.dancing && errors.creativeSkills.dancing)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.creativeSkills.dancing}

                                                            />
                                                        </div>

                                                        <h3>Personality Asessment</h3>
                                                        <div>
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'confidence'}
                                                                // error={Boolean( touched.confidence && errors.confidence)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.confidence}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to recognise numners"
                                                                name={'responsibility'}
                                                                // error={Boolean(touched.responsibility && errors.responsibility)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.responsibility}
                                                                sx={{ width: 300 }}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Ability to write"
                                                                name={'curiosity'}
                                                                // error={Boolean( touched.curiosity && errors.curiosity)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.curiosity}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Enjoys dancing"
                                                                name={'obedience'}
                                                                // error={Boolean(touched.obedience && errors.obedience)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.obedience}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Enjoys dancing"
                                                                name={'concentration'}
                                                                // error={Boolean(touched.concentration && errors.concentration)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.concentration}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Enjoys dancing"
                                                                name={'social_interaction'}
                                                                // error={Boolean(touched.social_interaction && errors.social_interaction)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.social_interaction}

                                                            />
                                                            <TextField
                                                                className={classes.field}
                                                                margin="normal"
                                                                variant="outlined"
                                                                label="Enjoys dancing"
                                                                name={'neatness'}
                                                                // error={Boolean(touched.neatness && errors.neatness)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.neatness}

                                                            />
                                                        </div>

                                                        <h3>Remark</h3>
                                                        <div><TextField
                                                            select
                                                            className={classes.field}
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Remark"
                                                            name={'remarkId'}
                                                            // error={Boolean(touched.remarkId && errors.remarkId)}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.remarkId}
                                                            sx={{ width: '100%' }}

                                                        >
                                                            <MenuItem key={""} value={""}>
                                                                No Selected
                                                            </MenuItem>
                                                            {remarks.map((option) => (
                                                                <MenuItem key={option._id} value={option._id}>
                                                                    {option.title}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                        </div>

                                                        {mode !== 'view' && (
                                                            <Button
                                                                className={classes.button}
                                                                type="submit"
                                                                color="warning"
                                                                variant="contained"
                                                            >
                                                                save results
                                                            </Button>
                                                        )}

                                                    </form>
                                                )
                                            }}
                                        </Formik>
                                    </div>
                                </Box>
                            </Paper>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </React.Fragment>
    )
}

export default AddNursaryResult;