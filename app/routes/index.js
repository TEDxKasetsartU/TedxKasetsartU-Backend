/**
 * 
 * @param {object} expressApp express object
 * @param {object} route_settings setting of route
 * @param {object} route_settings.default_path prefix of path
 * @param {object} route_settings.version path version
 * @param {object} route_settings.fixtures model fixture, auto map by model name and file name
 * @param {object} settings setting of model and controller
 * @param {object} settings.model model setting
 * @param {object} settings.model.object model of route
 * @param {object} settings.model.fixture fixture of model
 * @param {object} settings.model.clear pass 'true', if want to clear all record inside model
 * @param {object} settings.controller controller setting
 * @param {object} settings.controller.object controller of model
 * @param {object} settings.controller.ignore ignore which APIs
 */
module.exports = (expressApp, route_settings, settings) => {
    const DefRoute = require("../routes/default");

    settings.forEach(setting => {
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

        const _load_fixture = (model, fixture) => {
            return model.create(fixture);
        };

        const choose_fixture_to_load = (is_fixture, model, fixture, fixtures) => {
            if (is_fixture) {
                return _load_fixture(model, fixture);
            } else {
                return _auto_load_fixture(model, fixtures);
            }
        };

        let model = setting.model.object;
        let fixture = setting.model.fixture;

        if (setting.model.clear)
            model.clear_db();

        choose_fixture_to_load(fixture, model, fixture, route_settings.fixtures).then((result) => {
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
            const default_route = new DefRoute(expressApp, model, params);
            default_route.exec();
        }).catch(() => {});
    });
};