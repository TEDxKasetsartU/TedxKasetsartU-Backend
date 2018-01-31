/** 
 * This is object of utils function for manage about route in application.
 * @namespace RouteUtils
 * 
 * @returns {Object} object of utils function.
 * @returns {Object} object.create create function, use to create new route.
 * @returns {Object} object.default default route function, use to create default route such as empty path or version path.
 * 
 * @version 0.3.0
 * @author Kamontat Chantrachirathumrong
 */
module.exports = {
    /**
     * For create route with input configuration.
     * 
     * @memberof RouteUtils
     * 
     * @param {Object} expressApp express app
     * @param {string} path_prefix prefix of the path (normally should be `/api/vx/` where x is version number)
     * @param {DefaultController} controller Default controller or subclass of it
     * @param {Object} settings route setting
     * @param {string[]} settings.action allow action
     * @param {Object} settings.fixture fixture setting
     * @param {boolean} settings.fixture.load auto load fixture in this model?
     * @param {boolean} settings.fixture.clear do we need to clear row in table?
     * @param {Object[]} settings.customs array of object for create new path that not default action of DefaultController
     * @param {string} settings.customs.name action name, can be anything.
     * @param {string} settings.customs.type default type, accept get, list, create, update, delete. By method will get path and http-method from those type.
     * @param {string} settings.customs.method define method name in subclass of controller. Must be defined.
     * @param {string} settings.customs.path postfix of path after getting path from type
     * 
     * @example Route.create(app, "/api", new Controller(), {
     *      fixture: {
     *          load: true,
     *          clear: true
     *      }
     * })
     *
     * @version 0.3.0
     * @author Kamontat Chantrachirathumrong
     */
    create: async (expressApp, path_prefix, controller, settings = {}) => {
        const LoggerUtil = require("../settings").api.l.util;

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

        const clear_data = async (flag) => {
            // console.log("clear data: " + flag);
            if (flag) await controller.model.clear_db();
        };

        const load_data = async (flag) => {
            // console.log("load data: " + flag);
            const loader = require("../settings").database.loader;
            if (flag) await loader.by_model(controller.model);
        };

        let action = set_allow_action(settings.action);
        let setting = {};

        await clear_data(settings.fixture.clear);
        await load_data(settings.fixture.load);

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

        if (settings.customs)
            settings.customs.forEach(element => {
                setting[element.method] = {
                    method: setting[element.type].method,
                    path: setting[element.type].path + element.path
                };
            });

        Object.keys(setting).forEach(element => {
            let s = setting[element];
            LoggerUtil.show_api_path(s.method.toUpperCase() + "-" + element.toUpperCase(), s.path);

            expressApp[s.method](s.path, function (req, res) {
                return controller[element](req, res);
            });
        });
    },


    /**
     * For create default route.
     * Path exist: 
     *      / => get empty string path
     *      /version => get version path
     * 
     * @memberof RouteUtils
     * @param {Object} expressApp express app
     * @param {Object} responseUtil response util from {@link ./app/apis/response.js}
     * @param {Object} Logger logger util from {@link ./app/apis/custom_logger.js}
     * 
     * @example Route.default(app, require("./app/apis/response"), require("./app/apis/custom_logger"))
     * 
     * @version 0.3.0
     * @author Kamontat Chantrachirathumrong
     */
    default: (expressApp, responseUtil, Logger) => {
        Logger.log("info", {
            "title": "GET-EMPTY",
            "url": "/"
        });
        expressApp.get("/", (req, res) => {
            responseUtil.set_200(res, "Empty page, learn more on document");
        });

        Logger.log("info", {
            "title": "GET-VERSION",
            "url": "/version"
        });
        expressApp.get("/version", (req, res) => {
            const app_setting = require("../settings").app_setting;
            responseUtil.set_200(res, app_setting.version);
        });
    }
};