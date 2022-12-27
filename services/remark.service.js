import httpStatus from "http-status";
import { Remark } from "../models/index.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

const getAll = async () => {
    const remark = await Remark.find({}, {password:0});
    return {
        status: httpStatus.OK,
        data: remark,
    };
}


const create = async (data) => {
    const createRemark = await Remark(data).save();
    return {
        status: httpStatus.OK,
        data: createRemark,
    };
}

const update = async (data) => {
    const updateRemark = await Remark.findByIdAndUpdate(
        data._id || data.id,
        data
    );
    return {
        status: httpStatus.OK,
        data: updateRemark,
    };
}

const remove = async (data) => {
    await Remark.findByIdAndDelete({ _id: new ObjectID(data._id) });
    return {
        status: httpStatus.OK
    };
}



export default {
    getAll,
    create,
    update,
    remove,
}

