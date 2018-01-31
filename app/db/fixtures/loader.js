const load_model_name = (name) => {
    const settings = require("../../settings");
    const fixtures = settings.database.fixtures;
    const models = settings.model;
    const model = models[name];

    let promises = [];

    if (fixtures.json[model.low_name]) {
        fixtures.json[model.low_name].forEach((element) => {
            promises.push(model.create(element));
        });
        console.log("load fixture (.json) -- " + name);
        return Promise.all(promises);
    } else if (fixtures.js[model.low_name]) {
        const util = fixtures.js[model.low_name];
        util.dependent_table_name().forEach(name => promises.push(settings.database.loader.by_name(name)));

        console.log("load fixture (.js) -- " + name);
        return Promise.all(promises).then(() => {
            return util.exec();
        });
    } else {
        console.error(name + " fixtures not exist");
        return new Promise((res) => res());
    }
};

/**
 * object of utils function. 
 * 
 * @param {Function} by_model load function by input model object
 * @param {Function} by_name load function by input name of the model object
 * 
 * @author Kamontat Chantrachirathumrong
 * @version 0.2.0
 */
module.exports = {
    /**
     * auto load fixture from db/fixtures/index by input model object
     * 
     * @param {Model} model model object from models folder
     * @returns {Promise<null>} promise of void value
     * 
     */
    by_model: (model) => load_model_name(model.low_name),
    /**
     * auto load fixture from db/fixtures/index by input model name
     * 
     * @param {string} model model name should be lower case
     * @returns {Promise<null>} promise of void value
     * 
     */
    by_name: load_model_name
};