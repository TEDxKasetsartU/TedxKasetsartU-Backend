const DefaultModel = require("./default");

/** 
 * `Speaker` model, create by use default model class ({@link #defaultmodel DefaultModel})
 * 
 * ### Database structure
 * 
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |name           |string|true    |
 * |speaker_info   |string|false   |
 * |topic          |string|false   |
 * |description    |string|false   |
 * |youtube_url_id |string|false   |
 * 
 * @constant {DefaultModel} SpeakerModel
 * @memberof Models
 * @example const speaker = require('./models').speaker
 */
const SpeakModel = new DefaultModel("Speaker", {
    name: {
        type: String,
        required: [true, "Speaker require name"]
    },
    speaker_info: {
        type: String
    },
    topic: {
        type: String,
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