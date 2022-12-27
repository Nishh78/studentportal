import { Schema, model } from "mongoose";

const userObj = new Schema({
    userId: {type: String, ref: 'user'},
    name: String,
    time: Date,
});

const studentResultSchema = Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'student'
        },
        english: {
            type: Number,
            required: true
        },
        hindi: {
            type: Number
        },
        maths: {
            type: Number
        },
        science: {
            type: Number
        },
        socialStudies: {
            type: Number
        },
        computer: {
            type: Number
        },
        punjabi: {
            type: Number
        },
        sanskrit: {
            type: Number
        },
        generalKnowledge: { type: String },
        updatedByUser: userObj,
        createdByUser: userObj
    },
    {
        timestamps: true,
    }
);

const StudentResult = model("student_result", studentResultSchema);

export default StudentResult;
