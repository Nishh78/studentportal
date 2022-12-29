import { Schema, model } from "mongoose";

const userObj = new Schema({
    userId: { type: String, ref: 'user' },
    name: String,
    time: Date,
});

const generalMarksSchema = Schema({
    subject: String,
    periodic_test: String,
    class_test: String,
    subject_activity: String,
    march_exam: String,
    total:String
})
const coScholasticAreaSchema = Schema({
    work_education: String,
    art_education: String,
    health_education: String
})
const disciplineSchema = Schema({
    sincerity_regularity: String,
    values_behaiour: String,
    tidiness: String,
    rules_regulation: String,
})
const studentResultSchema = Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'student'
        },
        generalMarks: [generalMarksSchema],
        coScholasticArea: coScholasticAreaSchema,
        discipline:disciplineSchema,
        remarkId: { type: String, ref: 'remark' },
        updatedByUser: userObj,
        createdByUser: userObj
    },
    {
        timestamps: true,
    }
);

const StudentResult = model("student_result", studentResultSchema);

export default StudentResult;
