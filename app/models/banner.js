const DefaultModel = require("./default");

// Type 1 - text  banner
// Type 2 - link  banner
// Type 3 - image banner
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