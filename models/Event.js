const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    notes: {
        type: String,
        required: false,
        unique: false,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

EventSchema.method("toJSON", function () {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model("Event", EventSchema);
