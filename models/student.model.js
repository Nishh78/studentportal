import { Schema, model } from "mongoose";

const studentSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        fathername: {
            type: String
        },
        mothername: {
            type: String
        },
        mobile: {
            type: Number
        },
        mobile2: {
            type: Number
        },
        address: {
            type: String
        },
        dob: {
            type: String
        },
        adminNo: {
            type: String
        },
        session: { type: String },
        term: { type: String },
        class: { type: String },
        section: { type: String }
    },
    {
        timestamps: true,
    }
);

const Student = model("student", studentSchema);

export default Student;
