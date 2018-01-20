const DefaultModel = require("./default");

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