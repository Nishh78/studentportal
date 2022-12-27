import httpStatus from "http-status";
import { Student, InchargeInfo, studentResultSchema } from "../models/index.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

const getAll = async (data) => {
    console.log(data);
    const student = await Student.find(data);
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
    console.log('isExist-------', isExist);
    if(isExist > 0){
        delete data.inchargeId;
        const student = await Student.find(data);
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

const getStudentInfo = async (data) => {
    const studentResult = await studentResultSchema.find(data);
    return {
        status: httpStatus.OK,
        data: studentResult,
    };
}

export default {
    getAll,
    getBydId,
    create,
    update,
    remove,
    getALlStudentByIncharge,
    addStudentResult,
    getStudentInfo
}

