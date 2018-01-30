/**
 * auto run fixture load from db/fixtures/index
 * @param {Model} model model object from models folder
 * @param {Object} fixtures object of fixture list
 * @param {json[]} fixtures.json json of column to create
 * @param {function[]} fixtures.js js fixture generator, This method should return Promise<null> and accept none parameter
 */
module.exports = async (model) => {
    const settings = require("../../settings");

    const fixtures = settings.database.fixtures;
    if (fixtures.json[model.low_name]) {
        fixtures.json[model.low_name].forEach(async (element) => {
            await model.create(element);
            console.log("load " + model.name);
        });
    } else if (fixtures.js[model.low_name]) {
        const method = fixtures.js[model.low_name];
        await method();
    } else {
        console.log(model.low_name + " fixtures not exist");
    }
};