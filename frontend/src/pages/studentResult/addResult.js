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
    generalMarks: Yup.array().of(
        Yup.object().shape({
            periodic_test: Yup.string().required("Periodic Test is required"),
            class_test: Yup.string().required("Class Test is required"),
            subject_activity: Yup.string().required("Subject Activity is required"),
            march_exam: Yup.string().required("March Exam is required"),
        })
    )
});

const validation2Schema = Yup.object({
    work_education: Yup.string().required("Periodic Test is required"),
    art_education: Yup.string().required("Class Test is required"),
    health_education: Yup.string().required("Subject Activity is required"),
});

const validationForm3Schema = Yup.object({
    sincerity_regularity: Yup.string().required("required"),
    values_behaiour: Yup.string().required("Crequired"),
    tidiness: Yup.string().required("required"),
    rules_regulation: Yup.string().required("required"),
});

const validationForm4Schema = Yup.object({
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


const AddResult = ({
    results,
    mode,
    handleMarksSubmit
}) => {

    console.log('results---', results);

    const classes = useStyles();

    const initialState = {
        generalMarks: [
            {
                subject: 'English',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Hindi',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Maths',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Science',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Social Studies',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Computer',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Punjabi',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'Sanskrit',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
            {
                subject: 'General Knowledge',
                periodic_test: "",
                class_test: "",
                subject_activity: "",
                march_exam: "",
            },
        ],
        coScholasticArea: { work_education: '', art_education: '', health_education: '' },
        discipline: { sincerity_regularity: '', values_behaiour: '', tidiness: '', rules_regulation: '' },
        remarkId: ''
    }

    const [expanded, setExpanded] = useState(false);
    const [remarks, setRemarks] = useState([]);
    const [marksInfo, setMarksInfo] = useState(initialState);

    const [isFormValid, setIsFormValid] = useState({
        form_1: false,
        form_2: false,
        form_3: false,
        form_4: false
    });

    const setFormValidate = (form, isValid) => {
        // console.log(form, isValid);
        // setIsFormValid(prevState => ({
        //     ...prevState,
        //     [form]: isValid
        // }))
    }

    const submitMarks = React.useCallback((key, values) => {
        setMarksInfo(oldstate => ({
            ...oldstate,
            [key]: values
        }))
    }, [marksInfo])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const handlePageSubmit = async () => {
        await handleMarksSubmit(marksInfo)
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


    // const isSubmitBtnDisables = React.useCallback(() => {
    //     return isFormValid.form_1 && isFormValid.form_2 && isFormValid.form_3 && isFormValid.form_4;
    // }, [isFormValid]);

    useEffect(() => {
        fetchRemark();
    }, []);

    useEffect(() => {
        if (results) {
            setMarksInfo({
                generalMarks: initialState.generalMarks.map(el => {
                    const markObj = results?.generalMarks.find(markEl => markEl.subject == el.subject);
                    return markObj ? markObj : el
                }),
                coScholasticArea: results?.coScholasticArea,
                discipline: results?.discipline,
                remarkId: results?.remarkId,
            });
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
                            General Marks*
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <Paper className={classes.paper} elevation={0} >
                                <Box >
                                    <div className={classes.container}>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{
                                                generalMarks: marksInfo.generalMarks
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={values => {
                                                submitMarks('generalMarks', values.generalMarks)
                                            }}
                                        >
                                            {({ values, touched, errors, handleChange, handleBlur, isValid }) => {
                                                setFormValidate('form_1', isValid)
                                                return (
                                                    <Form noValidate autoComplete="off">
                                                        <FieldArray name="generalMarks">
                                                            {({ push, remove }) => (
                                                                <div>
                                                                    {values.generalMarks.map((p, index) => {
                                                                        const subject = `generalMarks[${index}].subject`;

                                                                        const periodicTest = `generalMarks[${index}].periodic_test`;
                                                                        const touchedperiodicTest = getIn(touched, periodicTest);
                                                                        const errorperiodicTest = getIn(errors, periodicTest);

                                                                        const classTest = `generalMarks[${index}].class_test`;
                                                                        const touchedclassTest = getIn(touched, classTest);
                                                                        const errorclassTest = getIn(errors, classTest);

                                                                        const subjectActivity = `generalMarks[${index}].subject_activity`;
                                                                        const touchedsubjectActivity = getIn(touched, subjectActivity);
                                                                        const errorsubjectActivity = getIn(errors, subjectActivity);

                                                                        const marchExam = `generalMarks[${index}].march_exam`;
                                                                        const touchedmarchExam = getIn(touched, marchExam);
                                                                        const errormarchExam = getIn(errors, marchExam);

                                                                        return (
                                                                            <div key={`generalForm_${index}`}>
                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    margin="normal"
                                                                                    variant="outlined"
                                                                                    label="Subject"
                                                                                    name={subject}
                                                                                    value={p.subject}
                                                                                    disabled={true}
                                                                                    sx={{ width: 180 }}
                                                                                />

                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    margin="normal"
                                                                                    variant="outlined"
                                                                                    label="Periodic Test"
                                                                                    name={periodicTest}
                                                                                    value={p.periodic_test}
                                                                                    required
                                                                                    helperText={
                                                                                        touchedperiodicTest && errorperiodicTest
                                                                                            ? errorperiodicTest
                                                                                            : ""
                                                                                    }
                                                                                    error={Boolean(touchedperiodicTest && errorperiodicTest)}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    sx={{ width: 200 }}
                                                                                />
                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    margin="normal"
                                                                                    variant="outlined"
                                                                                    label="Class Test"
                                                                                    name={classTest}
                                                                                    value={p.class_test}
                                                                                    required
                                                                                    helperText={
                                                                                        touchedclassTest && errorclassTest
                                                                                            ? errorclassTest
                                                                                            : ""
                                                                                    }
                                                                                    error={Boolean(touchedclassTest && errorclassTest)}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    sx={{ width: 200 }}
                                                                                />
                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    margin="normal"
                                                                                    variant="outlined"
                                                                                    label="Subject Activity"
                                                                                    name={subjectActivity}
                                                                                    value={p.subject_activity}
                                                                                    required
                                                                                    helperText={
                                                                                        touchedsubjectActivity && errorsubjectActivity
                                                                                            ? errorsubjectActivity
                                                                                            : ""
                                                                                    }
                                                                                    error={Boolean(touchedsubjectActivity && errorsubjectActivity)}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    sx={{ width: 200 }}
                                                                                />
                                                                                <TextField
                                                                                    className={classes.field}
                                                                                    margin="normal"
                                                                                    variant="outlined"
                                                                                    label="Class Test"
                                                                                    name={marchExam}
                                                                                    value={p.march_exam}
                                                                                    required
                                                                                    helperText={
                                                                                        touchedmarchExam && errormarchExam
                                                                                            ? errormarchExam
                                                                                            : ""
                                                                                    }
                                                                                    error={Boolean(touchedmarchExam && errormarchExam)}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    sx={{ width: 200 }}
                                                                                />
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                        </FieldArray>
                                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                                        <Button
                                                            className={classes.button}
                                                            type="submit"
                                                            color="primary"
                                                            variant="contained"
                                                            disabled={!isValid}
                                                        >
                                                            submit
                                                        </Button>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>
                                    </div>
                                </Box>
                            </Paper>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ background: expanded === 'panel2' && '#D1E9FC' }} expanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Co-Scholastic Areas*</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <Paper className={classes.paper} elevation={0} >
                                <Box >
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={marksInfo.coScholasticArea}
                                        validationSchema={validation2Schema}
                                        onSubmit={(values, actions) => {
                                            submitMarks('coScholasticArea', values);
                                        }}
                                    >
                                        {props => {
                                            setFormValidate('form_2', props.isValid)
                                            return (
                                                <form onSubmit={props.handleSubmit}>
                                                    <div><TextField
                                                        className={classes.field}
                                                        margin="normal"
                                                        variant="outlined"
                                                        label="Work Education"
                                                        name={'work_education'}
                                                        error={Boolean(props.touched.work_education && props.errors.work_education)}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        value={props.values.work_education}

                                                    />
                                                        <TextField
                                                            className={classes.field}
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Art Education"
                                                            name={'art_education'}
                                                            error={Boolean(props.touched.art_education && props.errors.art_education)}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.art_education}

                                                        />
                                                        <TextField
                                                            className={classes.field}
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Health & Physical Education"
                                                            name={'health_education'}
                                                            error={Boolean(props.touched.health_education && props.errors.health_education)}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.health_education}
                                                            sx={{ width: 250 }}
                                                        /></div>

                                                    <Button
                                                        className={classes.button}
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        disabled={!props.isValid}
                                                    >
                                                        submit
                                                    </Button>
                                                </form>
                                            )
                                        }}
                                    </Formik>
                                </Box>
                            </Paper>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ background: expanded === 'panel3' && '#D1E9FC' }} expanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Discipline*
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <Paper className={classes.paper} elevation={0} >
                                <Box >
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={marksInfo.discipline}
                                        validationSchema={validationForm3Schema}
                                        onSubmit={(values, actions) => {
                                            submitMarks('discipline', values)
                                        }}
                                    >
                                        {props => {
                                            setFormValidate('form_3', props.isValid)
                                            return (
                                                <form onSubmit={props.handleSubmit}>
                                                    <div><TextField
                                                        className={classes.field}
                                                        margin="normal"
                                                        variant="outlined"
                                                        label="Sincerity and regularity"
                                                        name={'sincerity_regularity'}
                                                        error={Boolean(props.touched.sincerity_regularity && props.errors.sincerity_regularity)}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        value={props.values.sincerity_regularity}

                                                    />
                                                        <TextField
                                                            className={classes.field}
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Values and behaviour"
                                                            name={'values_behaiour'}
                                                            error={Boolean(props.touched.values_behaiour && props.errors.values_behaiour)}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.values_behaiour}

                                                        />
                                                        <TextField
                                                            className={classes.field}
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Tidiness"
                                                            name={'tidiness'}
                                                            error={Boolean(props.touched.tidiness && props.errors.tidiness)}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.tidiness}
                                                            sx={{ width: 250 }}
                                                        />
                                                        <TextField
                                                            className={classes.field}
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Respect for rules and regulations"
                                                            name={'rules_regulation'}
                                                            error={Boolean(props.touched.rules_regulation && props.errors.rules_regulation)}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.rules_regulation}
                                                            sx={{ width: 300 }}
                                                        />
                                                    </div>

                                                    <Button
                                                        className={classes.button}
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        disabled={!props.isValid}
                                                    >
                                                        submit
                                                    </Button>
                                                </form>
                                            )
                                        }}
                                    </Formik>
                                </Box>
                            </Paper>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ background: expanded === 'panel3' && '#D1E9FC' }} expanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Remark*
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <Paper className={classes.paper} elevation={0} >
                                <Box >
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={{ remarkId: marksInfo.remarkId }}
                                        validationSchema={validationForm4Schema}
                                        onSubmit={(values, actions) => {
                                            submitMarks('remarkId', values.remarkId)
                                        }}
                                    >
                                        {props => {
                                            setFormValidate('form_4', props.isValid)
                                            return (
                                                <form onSubmit={props.handleSubmit}>
                                                    <div><TextField
                                                        select
                                                        className={classes.field}
                                                        margin="normal"
                                                        variant="outlined"
                                                        label="Remark"
                                                        name={'remarkId'}
                                                        error={Boolean(props.touched.remarkId && props.errors.remarkId)}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        value={props.values.remarkId}
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

                                                    <Button
                                                        className={classes.button}
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        disabled={!props.isValid}
                                                    >
                                                        submit
                                                    </Button>
                                                </form>
                                            )
                                        }}
                                    </Formik>
                                </Box>
                            </Paper>
                        </div>
                    </AccordionDetails>
                </Accordion>
                {mode !== 'view' && (
                    <Button sx={{ width: 200, marginTop: 2 }} disabled={false} variant="contained" color="warning" onClick={handlePageSubmit}>
                        Save results <KeyboardArrowRightOutlined />
                    </Button>
                )}
            </div>
        </React.Fragment>
    )
}

export default AddResult;