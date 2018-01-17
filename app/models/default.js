const errors = require("restify-error");

/**
 * create mongo schema and model, 
 * More {@link http://mongoosejs.com/docs/guide.html#options|mongoosejs}
 * @class
 * @param {string} database_name database name
 * @param {object} database_columns column inside database
 * @param {object} database_options option of Schema creator 
 */
class DefaultModel {
    /**
     * mongoose instance
     * @static
     *  @returns {object} mongooes
     */
    get mongoose() {
        return require("mongoose");
    }

    /**
     * default limit of list model
     * @static
     * @returns {number} 15
     */
    get DEFAULT_LIMIT() {
        return 15;
    }

    /**
     * get model name
     * @static 
     * @returns {string} database name
     */
    get name() {
        return this.n;
    }

    set name(name) {
        this.n = name;
    }

    /**
     * @constructor
     */
    constructor(database_name, database_columns, database_options) {
        this.name = database_name;
        this.schema = new this.mongoose.Schema(database_columns, database_options);
        this.model = this.mongoose.model(database_name, this.schema);
    }

    /**
     * create new model
     * @param {object} parameters model columns
     * @returns {Promise<Model>} promise of mongo model
     */
    create(parameters) {
        const m = new this.model(parameters);
        return new Promise((res, rej) => {
            m.save((err, m) => {
                if (err) return rej(err);
                res(m);
            });
        });
    }

    /**
     * list row in database, by limitation and next
     * @param {number} next next element, More {@link https://docs.mongodb.com/manual/reference/method/cursor.skip/#cursor.skip|mongodb-skip}
     * @returns {Promise<Array<Model>>} promise of list of mongo model
     */
    list(next) {
        return this.model.find({}, null, {
            "limit": this.DEFAULT_LIMIT,
            "skip": next * this.DEFAULT_LIMIT
        }).exec();
    }

    /**
     * get one model specify by _id
     * @param {string} id model id
     * @returns {Promise<Model>} promise of mongo model
     */
    retrieve(id) {
        return new Promise((res, rej) => {
            return this.model.findById(id)
                .exec().then((result) => {
                    if (!result) rej(new errors.NotFoundError("ID " + id + " is not exist"));
                    res(result);
                }).catch((err) => {
                    rej(err);
                });
        });
    }

    /**
     * update model that have id same as input id
     * @param {string} id input id
     * @param {object} body update column 
     * @returns {Promise<Model>} promise of new mongo model
     */
    update(id, body) {
        body["$inc"] = {
            "__v": 1
        };
        return new Promise((res, rej) => {
            return this.model.findByIdAndUpdate(id, body, {
                "new": true
            }).exec().then((result) => {
                if (!result) rej(new errors.NotFoundError("ID " + id + " is not exist"));
                res(result);
            }).catch((err) => {
                rej(err);
            });
        });
    }

    /**
     * delete one model specify by _id
     * @param {string} id model id
     * @returns {Promise<Null>} promise of empty
     */
    delete(id) {
        return new Promise((res, rej) => {
            return this.model.findByIdAndRemove(id)
                .exec().then((result) => {
                    if (!result) rej(new errors.NotFoundError("ID " + id + " is not exist"));
                    res(result);
                }).catch((err) => {
                    rej(err);
                });
        });
    }

    /**
     * count element model by [condition]
     * @param {object} condition filter model and counting {@link http://mongoosejs.com/docs/api.html#model_Model.count|Model.count}
     * @returns {Promise<Null>} promise of count number
     */
    count(condition = {}) {
        return this.model.count(condition).exec();
    }
}

module.exports = DefaultModel;