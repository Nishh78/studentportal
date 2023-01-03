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
    format: "A3",
    orientation: "portrait",
    border: "10mm"
}

const getAll = async (data) => {
    if (data && data?.inchargeId) {
        const incharge = await InchargeInfo.findOne({ inchargeId: data?.inchargeId }, { session: 1, class: 1, section: 1, term: 1, _id:0 }).lean();
        data = {...incharge};
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
    const isExist = await InchargeInfo.find(data).count();
    if (isExist > 0) {
        delete data.inchargeId;
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
    const updatestudentResult = await studentResultSchema.findByIdAndUpdate(
        { studentId: data.studentId },
        data
    );
    return {
        status: httpStatus.OK,
        data: updatestudentResult,
    };
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
                }
            },
            { $match: data }
        ]);
        console.log('student', student);
        if (student) {
            // const html = fs.readFileSync(path.join(__dirname + '/views/studentResult.html'), 'utf-8');
            // const filename = student.name + student.adminNo + Math.random() + '_result' + '.pdf';
            // const document = {
            //     html: html,
            //     data: {
            //         products: student
            //     },
            //     path: './docs/' + filename
            // }
            // pdf.create(document, options)
            //     .then(res => {
            //         console.log(res);
            //     }).catch(error => {
            //         console.log(error);
            //     });
            // const filepath = 'http://localhost:3000/docs/' + filename;

            return {
                status: httpStatus.OK,
                data: null
            };
        } else {
            return {
                status: httpStatus.OK,
                data: null,
            };
        }
    } catch (error) {
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

