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
        english: {
            to_write: String,
            to_read_identify: String,
            to_narrate: String,
            to_recite_poem: String,
            to_converse: String,
        },
        hindi: {
            to_write: String,
            to_read_identify: String,
            to_narrate: String,
            to_recite_poem: String,
            to_converse: String,
        },
        maths: {
            to_write: String,
            recognises_numbers: String
        },
        creativeSkills: {
            recognises_colors: String,
            drawing_coloring: String,
            playing_games: String,
            to_recite_poem: String,
            dancing: String,
        },
        confidence: String,
        responsibility: String,
        curiosity: String,
        obedience: String,
        concentration: String,
        social_interaction: String,
        neatness: String,
        updatedByUser: userObj,
        createdByUser: userObj
    },
    {
        timestamps: true,
    }
);

const StudentResult = model("student_result", studentResultSchema);

export default StudentResult;
