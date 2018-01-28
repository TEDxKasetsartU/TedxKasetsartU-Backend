/**
 * Index of creating route helper
 * @name route_index
 * 
 * @param {Object} expressApp express object
 * @param {Object} route_settings setting of route
 * @param {Object} route_settings.default_path prefix of path
 * @param {Object} route_settings.version path version
 * @param {Object} route_settings.fixtures model fixture, auto map by model name and file name
 * @param {Object} settings setting of model and controller
 * @param {Object} settings.model model setting
 * @param {Object} settings.model.object model of route
 * @param {Object} settings.model.fixture fixture of model
 * @param {Object} settings.model.clear pass 'true', if want to clear all record inside model
 * @param {Object} settings.controller controller setting
 * @param {Object} settings.controller.object controller of model
 * @param {Object} settings.controller.ignore ignore which APIs
 * @param {Function} settings.functions list of custom APIs function
 * 
 * @returns {Promise<null>} promise of null, only tell code when setup completed
 * 
 * @author Kamontat Chantrachirathumrong
 * @version 0.2.0-beta.3
 */
module.exports = (expressApp, route_settings, settings) => {
    const DefRoute = require("../routes/default");
    let creators = [];

    settings.forEach(setting => {
        /**
         * auto run fixture load from db/fixtures/index
         * @param {Model} model model object from models folder
         * @param {Object} fixtures object of fixture list
         * @param {json[]} fixtures.json json of column to create
         * @param {function[]} fixtures.js js fixture generator, This method should return Promise<null> and accept none parameter
         */
        const _auto_load_fixture = (model, fixtures) => {
            if (fixtures.json[model.low_name]) {
                let promises = [];
                fixtures.json[model.low_name].forEach((element) => {
                    promises.push(_load_fixture(model, element));
                });
                return Promise.all(promises);
            } else if (fixtures.js[model.low_name]) {
                const method = fixtures.js[model.low_name];
                return method();
            }
        };

        /**
         * choose way to loading fixture
         * @param {boolean} is_fixture flag that need to load as 1 fixture or multiple of them
         * @param {Model} model database model
         * @param {Object} fixture object/json of model column
         * @param {Object} fixtures object of fixture list
         * @param {json[]} fixtures.json json of column to create
         * @param {function[]} fixtures.js js fixture generator, This method should return Promise<null> and accept none parameter
         */
        const choose_fixture_to_load = (is_fixture, model, fixture, fixtures) => {
            if (is_fixture) {
                return _load_fixture(model, fixture);
            } else {
                return _auto_load_fixture(model, fixtures);
            }
        };

        /**
         * load fixture (json) to model by create method.
         * @param {Model} model model of database
         * @param {Object} fixture data to create, as json object
         */
        const _load_fixture = (model, fixture) => {
            return model.create(fixture);
        };

        let model = setting.model.object;
        let fixture = setting.model.fixture;
        let params = JSON.parse(JSON.stringify(route_settings));
        if (setting.controller) {
            let controller = setting.controller.object;
            let ignore_path = setting.controller.ignore;
            params["controller"] = controller;
            params["controller_options"] = {
                "apis": {
                    "ignore": ignore_path
                }
            };
        }

        if (setting.functions) params["functions"] = setting.functions;
        if (setting.model.clear) creators.push(model.clear_db());

        creators.push(choose_fixture_to_load(fixture, model, fixture, route_settings.fixtures).then(() => {
            const default_route = new DefRoute(expressApp, model, params);
            return default_route.exec();
        }));
    });

    return Promise.all(creators);
};