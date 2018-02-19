const DefaultModel = require("./default");
const Types = require("mongoose").Schema.Types;

/**
 * `Event` model, create by use default model class ({@link #defaultmodel DefaultModel}).
 *
 * ### Database structure
 *
 * |column_name    |type    |require?  |unique?|index?|
 * |---------------|--------|----------|-------|------|
 * |year           |number  |true      |true   |true  |
 * |datetime       |date    |false     |false  |false |
 * |locations      |obj-id[]|false     |false  |false |
 * |speakers       |obj-id[]|false     |false  |false |
 * |members        |obj-id[]|false     |false  |false |
 * |banners        |obj-id[]|false     |false  |false |
 *
 * @constant {DefaultModel} EventModel
 * @memberof Models
 * @example const event = require('./models').event
 *
 */
const EventModel = new DefaultModel("Event", {
    year: {
        type: Number,
        // unique: true, index: true, required: [true, "Event year is required"]
    },
    cover: {
        type: String
    },
    concept: {
        type: Types.ObjectId,
        ref: "Concept"
    },
    location: {
        type: Types.ObjectId,
        ref: "Location"
    },
    speakers: {
        type: [Types.ObjectId],
        ref: "Speaker"
    },
    partners: {
        type: [Types.ObjectId],
        ref: "Partner"
    },
    volunteers: {
        type: [Types.ObjectId],
        ref: "Volunteer"
    },
    start_datetime: {
        type: Date
    },
    end_datetime: {
        type: Date
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = EventModel;