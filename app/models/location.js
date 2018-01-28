const DefaultModel = require("./default");

/** 
 * `Location` model, create by use default model class ({@link #defaultmodel DefaultModel})
 * 
 * ### Database structure
 * 
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |name           |string|true    |
 * |detail         |string|false   |
 * |lat            |number|true    |
 * |lon            |number|true    |
 * 
 * @constant {DefaultModel} LocationModel
 * @memberof Models
 * @example const location = require('./models').location
 * 
 */
const LocationModel = new DefaultModel("Location", {
    name: {
        type: String,
        required: [true, "Location require name"]
    },
    detail: {
        type: String
    },
    lat: {
        type: Number,
        required: [true, "Location require latitude"]
    },
    lon: {
        type: Number,
        required: [true, "Location require longitude"]
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = LocationModel;