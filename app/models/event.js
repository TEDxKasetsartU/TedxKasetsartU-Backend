const DefaultModel = require("./default");

const MemberModel = new DefaultModel("Event", {
    year: {
        type: Number
    },
    member: {
        type: require("mongoose").Schema.Types.ObjectId,
        ref: "Member"
    },
    speaker: {
        type: require("mongoose").Schema.Types.ObjectId,
        ref: "Speaker"
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = MemberModel;