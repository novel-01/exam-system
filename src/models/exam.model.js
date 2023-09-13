const { Schema, model } = require("mongoose");

const examSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    finishDate: {
        type: Date,
        default: null,
    },
    passScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    file: {
        type: String,
        default: null,
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "groups",
    },
});

module.exports = model("exam", examSchema);