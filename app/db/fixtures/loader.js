/**
 * auto run fixture load from db/fixtures/index
 * 
 * @param {Model} model model object from models folder
 * 
 * @author Kamontat Chantrachirathumrong
 * @version 0.2.0
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