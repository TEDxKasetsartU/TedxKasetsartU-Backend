const mongoose = require("mongoose");

const DEFAULT_LIMIT = 15;

const SpeakerSchema = new mongoose.Schema({
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

const Speaker = mongoose.model("Speaker", SpeakerSchema);

/** Helper function */
const SpeakerCreator = (parameters) => {
    const speaker = new Speaker(parameters);
    return new Promise((res, rej) => {
        speaker.save((err, speaker) => {
            if (err) return rej(err);
            res(speaker);
        });
    });
};

const SpeakerList = (next) => {
    return Speaker.find({}, null, {
        "limit": DEFAULT_LIMIT,
        "skip": next * DEFAULT_LIMIT
    }).exec();
};

const SpeakerRetrieve = (id) => {
    return Speaker.findById(id)
        .exec();
};

const SpeakerUpdate = (id, body) => {
    body["$inc"] = {
        "__v": 1
    };
    return Speaker.findByIdAndUpdate(id, body, {
        "new": true
    }).exec();
};

const SpeakerDestroyer = (id) => {
    return Speaker.findByIdAndRemove(id)
        .exec();
};

module.exports = {
    "Speaker": Speaker,
    "SpeakerCreator": SpeakerCreator,
    "SpeakerList": SpeakerList,
    "SpeakerRetrieve": SpeakerRetrieve,
    "SpeakerUpdate": SpeakerUpdate,
    "SpeakerDestroyer": SpeakerDestroyer
};