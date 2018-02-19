const DefaultModel = require("./default");

/**
 * `Concept` model, create by use default model class ({@link #defaultmodel DefaultModel})
 *
 * ### Database structure
 *
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |title          |string|false   |
 * |detail         |string|false   |
 *
 * @constant {DefaultModel} ConceptModel
 * @memberof Models
 * @example const concept = require('./models').concept
 *
 */
const ConceptModel = new DefaultModel("Concept", {
    title: {
        type: String
    },
    detail: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = ConceptModel;