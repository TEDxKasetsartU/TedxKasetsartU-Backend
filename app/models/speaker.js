const DefaultModel = require("./default");

/** 
 * `Speaker` model, create by use default model class ({@link #defaultmodel DefaultModel})
 * 
 * ### Database structure
 * 
 * |column_name    |type  |require?|
 * |---------------|------|--------|
 * |name           |string|true    |
 * |description    |string|false   |
 * |topic          |string|false   |
 * |image          |string|false   |
 * |youtube_id     |string|false   |
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
    description: {
        type: String
    },
    topic: {
        type: String,
    },
    image: {
        type: String
    },
    youtube_id: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updateAt: "updateAt"
    }
});

module.exports = SpeakModel;