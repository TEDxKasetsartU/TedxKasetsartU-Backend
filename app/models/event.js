const DefaultModel = require("./default");
const Types = require("mongoose").Schema.Types;

const EventModel = new DefaultModel("Event", {
    year: {
        type: Number,
        unique: true,
        index: true,
        required: [true, "Event year is required"]
    },
    datetime: {
        type: Date
    },
    locations: {
        type: [Types.ObjectId],
        ref: "Location"
    },
    speakers: {
        type: [Types.ObjectId],
        ref: "Speaker"
    },
    members: {
        type: [Types.ObjectId],
        ref: "Member"
    },
    banners: {
        type: [Types.ObjectId],
        ref: "Banner"
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = EventModel;