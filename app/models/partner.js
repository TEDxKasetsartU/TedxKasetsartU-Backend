const DefaultModel = require("./default");

/**
 * `Partner` model, create by use default model class ({@link #defaultmodel DefaultModel})
 *
 * ### Database structure
 *
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |name           |string|false   |
 * |image          |string|false   |
 * |url            |string|false   |
 *
 * @constant {DefaultModel} PartnerModel
 * @memberof Models
 * @example const partner = require('./models').partner
 *
 */
const PartnerModel = new DefaultModel("Partner", {
    name: {
        type: String
    },
    image: {
        type: String
    },
    url: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = PartnerModel;