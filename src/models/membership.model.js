const { Schema, model } = require("mongoose");

const membershipSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        group_id: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("membership", membershipSchema);