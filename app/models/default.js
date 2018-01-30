const errors = require("restify-error");
const Promise = require("bluebird");

/**
 * create mongo schema and model, 
 * More {@link http://mongoosejs.com/docs/guide.html#options|mongoosejs}
 * @class
 * 
 * @param {string} database_name database name
 * @param {Object} database_columns column inside database
 * @param {Object} database_options option of Schema creator 
 * 
 * @author Kamontat Chantrachirathumrong
 * @version 0.2.0-beta.3
 */
class DefaultModel {
    /**
     * mongoose instance
     * @static
     *  @returns {Object} mongooes
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

    /**
     * get model name as lower case
     * @returns {string} database name
     */
    get low_name() {
        return this.n.toLowerCase();
    }

    get plural_name() {
        return this.n.toLowerCase() + "s";
    }

    /**
     * setter of model name
     * @param {string} name new name
     */
    set name(name) {
        this.n = name;
    }

    /**
     * @constructor
     */
    constructor(database_name, database_columns, database_options) {
        this.env = process.env.NODE_ENV || "development";

        this.name = database_name;
        this.schema = new this.mongoose.Schema(database_columns, database_options);
        if (this._is_testing())
            this.schema.plugin(require("mongoose-simple-random"));
        try {
            this.model = this.mongoose.model(database_name, this.schema);
        } catch (err) {
            this.model = this.mongoose.model(database_name);
        }
    }

    /** 
     * check environment is testing (dev,test,citest)
     * @private
     */
    _is_testing() {
        return (this.env == "development" || this.env == "test" || this.env == "citest");
    }

    /**
     * create new model
     * @param {Object} parameters model columns
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
     * @param {Object} option option for list
     * @param {number|string} option.default_limit overide default limit, input 'all' to list every result
     * @param {Object} option.filter filter result, must be JSON which key is same as column
     * @returns {Promise<Model[]>} promise of list of mongo model
     */
    list(next, option = {}) {
        let limit = this.DEFAULT_LIMIT;
        let filter = {};
        let only = null;
        if (option.default_limit) limit = Number(option.default_limit);
        if (option.filter) filter = option.filter;
        if (option.only) only = option.only;

        return this.model.find(filter, only, {
            "limit": limit,
            "skip": next * limit
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
                    if (!result) rej(new errors.NotFoundError("Cannot get id " + id + " is not exist."));
                    res(result);
                }).catch((err) => {
                    rej(err);
                });
        });
    }

    /**
     * update model that have id same as input id
     * @param {string} id input id
     * @param {Object} body update column 
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
                if (!result) rej(new errors.NotFoundError("Cannot update id " + id + " is not exist"));
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
     * remove row by using condition
     * @param {Object} condition remving condition
     */
    delete_by_condition(condition) {
        return this.model.remove(condition).exec();
    }

    /**
     * count element model by [condition]
     * @param {Object} condition filter model and counting {@link http://mongoosejs.com/docs/api.html#model_Model.count|Model.count}
     * @returns {Promise<Null>} promise of count number
     */
    count(condition = {}) {
        return this.model.count(condition).exec();
    }

    /**
     * random element using {@link https://www.npmjs.com/package/mongoose-simple-random|mongoose-simple-random}
     * @param {Object} filter filter result
     * @param {Object} fields choose the result output
     * @param {Object} options resut management
     * @param {number} options.skip skip result, same as next
     * @param {number} options.limit limit the result, default is array size 1
     * 
     * @returns {Promise<Object[]>} promise of the random object as array
     */
    random(filter = {}, fields = {}, options = {}) {
        if (!this._is_testing()) return new Promise((res) => {
            res();
        });

        return new Promise((res, rej) => {
            return this.model.findRandom(filter, fields, options, function (err, results) {
                if (err)
                    return rej(err);
                if (!results) rej(new errors.NotFoundError("Cannot random, try again"));
                else res(results);
            });
        });
    }

    randomOne() {
        if (!this._is_testing()) return new Promise((res) => {
            res();
        });

        return new Promise((res, rej) => {
            return this.model.findOneRandom((err, result) => {
                if (err) rej(new errors.NotFoundError("Cannot random, try again"));
                if (!result) rej(new errors.NotFoundError("Cannot random, try again"));
                else res(result);
            });
        });
    }

    /** 
     * clear all row this model (Table)
     * @returns {Promise<null>} promise of null
     */
    clear_db() {
        console.log("CLEAR DATABASE!!??");
        return this.delete_by_condition({});
    }
}

module.exports = DefaultModel;