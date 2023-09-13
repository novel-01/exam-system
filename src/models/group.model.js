const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        direction: {
            type: String,
            required: true,
        },
        lessonDays: {
            type: String,
            required: true,
        },
        lessonTime: {
            type: String,
            required: true,
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("groups", groupSchema);