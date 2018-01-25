const DefaultModel = require("./default");

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