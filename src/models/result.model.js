const { Schema, model } = require("mongoose");

const examResultSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        ball: {
            type: Number,
            default: 0,
        },
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "students",
            required: true,
        },
        status: {
            type: String,
            enum: ["failure", "success"],
            default: "failure",
        },
        exam_id: {
            type: Schema.Types.ObjectId,
            ref: "exams",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("examResult", examResultSchema);