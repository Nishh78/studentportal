import httpStatus from "http-status";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


function createAccessToken(userId) {
    return jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, {
        expiresIn: '10m'
    });
}

const login = async (data) => {

    let user = await User.findOne({ email: data.email, status: data.status }).lean();
    if (!user) {
        return {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "User does not exist",
        };
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) return { status: httpStatus.NOT_FOUND, message: "Invalid credentials" };
    const token = createAccessToken(user._id);

    return {
        status: httpStatus.OK,
        data:{...user,token},
        message: "Login Successs",
    };
};

export default {
    login
}