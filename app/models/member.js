const DefaultModel = require("./default");

/** 
 * `Member` model, create by use default model class ({@link #defaultmodel DefaultModel})
 * 
 * ### Database structure
 * 
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |name           |string|true    |
 * |position       |string|true    |
 * |faculty        |string|false   |
 * 
 * @constant {DefaultModel} MemberModel
 * @memberof Models
 * @example const member = require('./models').member
 * 
 */
const MemberModel = new DefaultModel("Member", {
    name: {
        type: String,
        required: [true, "Member require name"]
    },
    position: {
        type: String,
        required: [true, "Member require position"]
    },
    faculty: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = MemberModel;