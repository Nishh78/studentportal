import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

const getAll = async () => {
    const incharge = await User.find({}, {password:0});
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
    data.role = "incharge";
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        data.password = hashPassword;
    }
    const createIncharge = await User(data).save();
    return {
        status: httpStatus.OK,
        data: createIncharge,
    };
}

const update = async (data) => {
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        data.password = hashPassword;
    }
    const updateIncharge = await User.findByIdAndUpdate(
        data._id || data.id,
        data
    );
    return {
        status: httpStatus.OK,
        data: updateIncharge,
    };
}

const remove = async (data) => {
    await User.findByIdAndDelete({ _id: new ObjectID(data._id) });
    return {
        status: httpStatus.OK
    };
}

const getAllSimpleIncharge = async (data) => {
    const inchargeList = await User.find(data, {name:1, _id:1}).sort({name: 1});
    return {
        status: httpStatus.OK,
        data: inchargeList,
    };
}

export default {
    getAll,
    getBydId,
    create,
    update,
    remove,
    getAllSimpleIncharge
}

