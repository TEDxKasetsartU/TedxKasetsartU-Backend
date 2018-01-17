const DefaultModel = require("./default");

const SpeakModel = new DefaultModel("Speaker", {
    name: {
        type: String
    },
    speaker_info: {
        type: String
    },
    topic: {
        type: String
    },
    description: {
        type: String
    },
    youtube_url_id: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = SpeakModel;
