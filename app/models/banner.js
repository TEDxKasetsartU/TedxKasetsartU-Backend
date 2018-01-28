const DefaultModel = require("./default");

/** 
 * `Banner` model, create by use default model class ({@link #defaultmodel DefaultModel}).
 * 
 * 1. `Type 1` - text  banner
 * 2. `Type 2` - link  banner
 * 3. `Type 3` - image banner
 * 
 * ### Database structure
 * 
 * |column_name    |type  |require?  |
 * |---------------|------|----------|
 * |title          |string|true      |
 * |type           |1,2,3 |true      |
 * |header         |string|if type=1 |
 * |footer         |string|if type=1 |
 * |detail         |string|if type=2 |
 * |link           |string|if type=2 |
 * |background     |string|false     |
 * 
 * @constant {DefaultModel} BannerModel
 * @memberof Models
 * @example const banner = require('./models').banner
 * 
 */
const BannerModel = new DefaultModel("Banner", {
    title: {
        type: String,
        required: [true, "Banner name required"]
    },
    type: {
        type: Number,
        enum: [1, 2, 3],
        required: [true, "Unknown banner type"]
    },
    header: {
        type: String,
        required: () => {
            return this.type == 1;
        }
    },
    footer: {
        type: String,
        required: () => {
            return this.type == 1;
        }
    },
    detail: {
        type: String,
        required: () => {
            return this.type == 2;
        }
    },
    link: {
        type: String,
        required: () => {
            return this.type == 2;
        }
    },
    background: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = BannerModel;