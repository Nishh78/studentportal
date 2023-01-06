import httpStatus from "http-status";
import { Student, InchargeInfo, studentResultSchema } from "../models/index.js";
import mongoose from "mongoose";
import pdf from "pdf-creator-node";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const ObjectID = mongoose.Types.ObjectId;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm"
}

const GET_GRADE = (mark) => {
    switch (true) {
        case mark >= 0 && mark <= 20:
            return 'C'
        case mark >= 21 && mark <= 40:
            return 'B'
        case mark >= 41 && mark <= 50:
            return 'A'
        default:
            return '-'
    }
}

const getAll = async (data) => {
    if (data && data?.inchargeId) {
        const incharge = await InchargeInfo.findOne({ inchargeId: data?.inchargeId }, { session: 1, class: 1, section: 1, term: 1, _id: 0 }).lean();
        data = { ...incharge };
    }
    const student = await Student.aggregate([
        {
            $lookup: {
                from: "student_results",
                localField: "_id",
                foreignField: "studentId",
                as: "student_result"
            }
        },
        { $match: data }
    ]);
    return {
        status: httpStatus.OK,
        data: student,
    };
}

const getBydId = async (_id) => {
    const student = await Student.findById(_id);
    return {
        status: httpStatus.OK,
        data: student,
    };
}

const create = async (data) => {
    const createstudent = await Student.insertMany(data);
    return {
        status: httpStatus.OK,
        data: createstudent,
    };
}

const update = async (data) => {
    const updatestudent = await Student.findByIdAndUpdate(
        data._id || data.id,
        data
    );
    return {
        status: httpStatus.OK,
        data: updatestudent,
    };
}

const remove = async (data) => {
    await Student.findByIdAndDelete({ _id: new ObjectID(data._id) });
    return {
        status: httpStatus.OK
    };
}

const getALlStudentByIncharge = async (data) => {
    const isExist = await InchargeInfo.findOne(data).lean();
    if (isExist) {
        const MATCH = { session: isExist.session, class: isExist.class, section: isExist.section, term: isExist.term };
        const student = await Student.aggregate([
            {
                $lookup: {
                    from: "student_results",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "student_result"
                }
            },
            { $match: MATCH }
        ]);
        return {
            status: httpStatus.OK,
            data: student,
        };
    } else {
        return {
            status: httpStatus.OK,
            data: [],
        };
    }

}

const addStudentResult = async (data) => {
    const createstudentResult = await studentResultSchema(data).save();
    return {
        status: httpStatus.OK,
        data: createstudentResult,
    };
}

const updateStudentResult = async (data) => {
    const _id = new ObjectID(data._id);
    delete data['_id'];
    try {
        const updatestudentResult = await studentResultSchema.findByIdAndUpdate(
            _id,
            data
        );
        return {
            status: httpStatus.OK,
            data: updatestudentResult
        };
    } catch (error) {
        console.log('error in service', error);
        return {
            status: httpStatus.OK,
            data: null,
        };
    }
}

const getStudentInfo = async (data) => {
    const studentResult = await studentResultSchema.find(data);
    return {
        status: httpStatus.OK,
        data: studentResult,
    };
}

const generateStudentResultPdf = async (data) => {
    try {
        const student = await Student.aggregate([
            {
                $lookup: {
                    from: "student_results",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "student_result"
                },

            },
            {
                $lookup: {
                    from: "remarks",
                    localField: "student_results.remarkId",
                    foreignField: "_id",
                    as: "remark"
                }
            },

            { $match: { _id: new ObjectID(data._id) } }
        ]);

        if (student && student[0]['student_result'].length > 0) {
            let studentInfo = student[0];
            let generalMarks = studentInfo.student_result[0]['generalMarks'].map(el => {
                let totalMark = parseInt(el.periodic_test) + parseInt(el.class_test) + parseInt(el.subject_activity) + parseInt(el.march_exam);
                return {
                    ...el,
                    total: totalMark,
                    grade: GET_GRADE(parseInt(totalMark))
                }
            })
            // console.log(JSON.stringify(studentInfo));
            const html = fs.readFileSync(path.join(__dirname, '../', '/views/studentResult.html'), 'utf-8');
            const filename = studentInfo.adminNo + '_result' + '.pdf';
            const document = {
                html: html,
                data: {
                    student: studentInfo,
                    generalMarks: generalMarks,
                    coScholasticArea: studentInfo.student_result[0]['coScholasticArea'],
                    discipline: studentInfo.student_result[0]['discipline'],
                },
                path: './docs/' + filename
            }

            await pdf.create(document, options);
            return {
                status: httpStatus.OK,
                data: filename,
                filename: filename
            };

        } else {
            return {
                status: httpStatus.OK,
                data: null,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: httpStatus.OK,
            data: null,
        };
    }
}


export default {
    getAll,
    getBydId,
    create,
    update,
    remove,
    getALlStudentByIncharge,
    addStudentResult,
    updateStudentResult,
    getStudentInfo,
    generateStudentResultPdf
}

