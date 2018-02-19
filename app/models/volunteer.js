const DefaultModel = require("./default");

/**
 * `Volunteer` model, create by use default model class ({@link #defaultmodel DefaultModel})
 *
 * ### Database structure
 *
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |name           |string|true    |
 * |position       |string|true    |
 * |image          |string|false   |
 *
 * @constant {DefaultModel} VolunteerModel
 * @memberof Models
 * @example const volunteer = require('./models').volunteer
 */
const VolunteerModel = new DefaultModel("Volunteer", {
    name: {
        type: String,
        required: [true, "Volunteer require name"]
    },
    position: {
        type: String,
        required: [true, "Volunteer require position"]
    },
    image: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = VolunteerModel;