import httpStatus from "http-status";
import { InchargeInfo } from "../models/index.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

const getAll = async () => {
    const incharge = await InchargeInfo.find().populate('inchargeId', 'name');
    return {
        status: httpStatus.OK,
        data: incharge,
    };
}

const getBydId = async (_id) => {
    const incharge = await User.findById(_id);
    return {
        status: httpStatus.OK,
        data: incharge,
    };
}

const create = async (data) => {
    console.log('data', data);
    const createIncharge = await InchargeInfo(data).save();
    return {
        status: httpStatus.OK,
        data: createIncharge,
    };
}

const update = async (data) => {
    const updateIncharge = await InchargeInfo.findByIdAndUpdate(
        data._id || data.id,
        data
    );
    return {
        status: httpStatus.OK,
        data: updateIncharge,
    };
}

const remove = async (data) => {
    await InchargeInfo.findByIdAndDelete({ _id: new ObjectID(data._id) });
    return {
        status: httpStatus.OK
    };
}

export default {
    getAll,
    getBydId,
    create,
    update,
    remove
}

