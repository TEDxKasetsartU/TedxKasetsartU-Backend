/**
 * auto run fixture load from db/fixtures/index
 * 
 * @param {Model} model model object from models folder
 * @returns {Promise<null>} promise of void value
 * 
 * @author Kamontat Chantrachirathumrong
 * @version 0.2.0
 */
module.exports = (model) => {
    const settings = require("../../settings");

    const fixtures = settings.database.fixtures;

    if (fixtures.json[model.low_name]) {
        let promises = [];
        fixtures.json[model.low_name].forEach(async (element) => {
            promises.push(model.create(element));
        });
        console.log("load fixture (.json) -- " + model.low_name);
        return Promise.all(promises);
    } else if (fixtures.js[model.low_name]) {
        const method = fixtures.js[model.low_name];
        console.log("load fixture (.js) -- " + model.low_name);
        return method();
    } else {
        console.error(model.low_name + " fixtures not exist");
        return new Promise((res) => res());
    }
};