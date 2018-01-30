module.exports = {
    /**
     * @class
     * @param {*} expressApp 
     * @param {*} path_prefix 
     * @param {*} model_object 
     * @param {*} controller 
     * @param {object} settings 
     * @param {string[]} settings.action allow action
     * @param {object} settings.fixture fixture setting
     * @param {boolean} settings.fixture.load auto load fixture in this model?
     * @param {boolean} settings.fixture.clear do we need to clear row in table?
     * 
     */
    create: async (expressApp, path_prefix, controller, settings = {}) => {
        const LoggerUtil = require("../settings").api.l.util;
        const loader = require("../settings").database.loader;

        const set_allow_action = (allows) => {
            let actions = {
                get: false,
                list: false,
                create: false,
                update: false,
                delete: false
            };

            allows.forEach(element => {
                actions[element] = true;
            });
            return actions;
        };

        let action = set_allow_action(settings.action);
        let setting = {};
        if (settings.fixture.clear) controller.model.clear_db();
        if (settings.fixture.load) loader(controller.model);

        // GET 1 model
        if (action.get)
            setting.get = {
                method: "get",
                path: path_prefix + controller.model_lower_name + "/:id"
            };

        // GET list model
        if (action.list)
            setting.list = {
                method: "get",
                path: path_prefix + controller.model_plural_name
            };

        // POST create new model
        if (action.create)
            setting.create = {
                method: "post",
                path: path_prefix + controller.model_lower_name
            };

        // PUT update exist model
        if (action.update)
            setting.update = {
                method: "put",
                path: path_prefix + controller.model_lower_name + "/:id"
            };

        // DELETE delete exist model
        if (action.delete)
            setting.delete = {
                method: "delete",
                path: path_prefix + controller.model_lower_name + "/:id"
            };

        if (settings.customs) {
            settings.customs.forEach(element => {
                setting[element.method] = {
                    method: setting[element.type].method,
                    path: setting[element.type].path + element.path
                };
            });
        }

        Object.keys(setting).forEach(element => {
            let s = setting[element];
            LoggerUtil.show_api_path(s.method.toUpperCase() + "-" + element.toUpperCase(), s.path);

            expressApp[s.method](s.path, function (req, res) {
                return controller[element](req, res);
            });
        });
    }
};