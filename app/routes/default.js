/**
 * Default routing object. This class use for auto create route in get/post/put/delete of the database
 * @class
 * 
 * @param {Object} expressApp express Object
 * @param {Object} model database model
 * @param {Object} parameter route parameters
 * @param {string} parameter.default_path prefix path
 * @param {string} parameter.version route version
 * @param {string} parameter.controller controller Object
 * @param {Object} parameter.controller_options controller options
 * @param {string} parameter.name model name (single)
 * @param {string} parameter.pl_name model name (plural)
 * 
 * @author Kamontat Chantrachirathumrong
 * @version 0.2.0-beta.3
 */
class DefaultRoute {

    /**
     * Setup each of parameter and initial variable.
     * 
     * @constructor
     */
    constructor(expressApp, model, parameter = {}) {
        const DefController = require("../controllers/default");

        let defaultParameter = {
            "default_path": "/api",
            "version": "v1",
            "controller": new DefController(model, parameter.controller_options),
            "controller_options": {},
            "name": model.name.toLowerCase(),
            "pl_name": model.name.toLowerCase() + "s",
            "functions": []
        };


        if (parameter.default_path) defaultParameter.default_path = parameter.default_path;
        if (parameter.version) defaultParameter.version = parameter.version;
        if (parameter.controller) defaultParameter.controller = new parameter.controller(model, parameter.controller_options);
        if (parameter.name) defaultParameter.name = parameter.name;
        if (parameter.pl_name) defaultParameter.pl_name = parameter.pl_name;
        if (parameter.functions) defaultParameter.functions = parameter.functions;

        this.express = expressApp;
        this.path = this.get_path(defaultParameter.default_path, defaultParameter.version);
        this.controller = defaultParameter.controller;
        this.name = defaultParameter.name;
        this.pl_name = defaultParameter.pl_name;
        this.APIsFunction = defaultParameter.functions;
    }

    /**
     * generate path from input value
     * @private
     * @param {string} prefix prefix of the path, auto start with /
     * @param {string} version the route version, can be v[0-9]+
     */
    get_path(prefix, version) {
        // add / before prefix if not exist
        if (prefix != "" && prefix.charAt(0) != "/") prefix = "/" + prefix;
        return prefix + "/" + version + "/";
    }

    /**
     * getting path by input values, include the default `this.path`
     * @param {string} name path name, usually will be model name
     * @param {string} custom postfix of the path
     */
    get_custom_path(name, custom = "") {
        if (custom && custom != "") custom = "/" + custom;
        return this.path + name + custom;
    }

    /**
     * Create the route of get/post/put/delete method.
     * 
     * @returns {Promise<null>} empty promise
     */
    exec() {
        return new Promise((res) => {
            this.get_list();
            this.get_retrieve();
            this.post_create();
            this.put_update();
            this.delete_destroy();
            this.APIsFunction.forEach(ele => {
                ele(this.express, this.model, this.controller, this.get_custom_path(this.name, ""), this.get_custom_path(this.pl_name, ""), this._log_create_log);
            });
            res();
        });
    }

    /**
     * default get method which return the `defaultResponse` method from controller
     */
    default_get() {
        this.express.get("*", this.controller.defaultResponse);
    }

    /**
     * check is this controller able to use list method. After this checking, 
     * create the APIs path {GET} by `this.path` + name + version + model name in plural form.
     * This using `list` method from controller
     * 
     * @param {string} custom custom postfix path of list all model method
     */
    get_list(custom = "") {
        if (this.controller.can_do("list")) {
            this._log_create_log("list", this.get_custom_path(this.pl_name, custom));
        }
        this.express.get(this.get_custom_path(this.pl_name, custom), (req, res) => {
            return this.controller.list(req, res);
        });
    }

    /**
     * check is this controller able to use `get` method. After checking, 
     * create the APIs path in {GET} method with `this.path` + name + version + model name in single form + fid
     * This using `get` method from controller. 
     * The parameter `id` should input as `dynamicPath` in the controller.
     * 
     * @param {string} id the key of parameter, which will transfer from url when it called
     */
    get_retrieve(id = "fid") {
        if (this.controller.can_do("get")) {
            this._log_create_log("get", this.get_custom_path(this.name, ":" + id));
        }
        this.express.get(this.get_custom_path(this.name, ":" + id), (req, res) => {
            return this.controller.get(req, res, id);
        });
    }

    /**
     * check is this controller able to use `create` method. After this checking, 
     * create the APIs path {POST} by `this.path` + name + version + model name in single form.
     * This using `create` method from controller
     * 
     * @param {string} custom custom postfix path of create model
     */
    post_create(custom = "") {
        if (this.controller.can_do("create")) {
            this._log_create_log("create", this.get_custom_path(this.name, custom));
        }
        this.express.post(this.get_custom_path(this.name, custom), (req, res) => {
            return this.controller.create(req, res);
        });
    }

    /**
     * check is this controller able to use `update` method. After checking, 
     * create the APIs path in {PUT} method with `this.path` + name + version + model name in single form + fid
     * This using `update` method from controller. 
     * The parameter `id` should input as `dynamicPath` in the controller.
     * 
     * @param {string} id the key of parameter, which will transfer from url when it called
     */
    put_update(id = "fid") {
        if (this.controller.can_do("update")) {
            this._log_create_log("update", this.get_custom_path(this.name, ":" + id));
        }
        this.express.put(this.get_custom_path(this.name, ":" + id), (req, res) => {
            return this.controller.update(req, res, id);
        });
    }

    /**
     * check is this controller able to use `delete` method. After checking, 
     * create the APIs path in {DELETE} method with `this.path` + name + version + model name in single form + fid
     * This using `delete` method from controller. 
     * The parameter `id` should input as `dynamicPath` in the controller.
     * 
     * @param {string} id the key of parameter, which will transfer from url when it called
     */
    delete_destroy(id = "fid") {

        if (this.controller.can_do("delete")) {
            this._log_create_log("delete", this.get_custom_path(this.name, ":" + id));
        }
        this.express.delete(this.get_custom_path(this.name, ":" + id), (req, res) => {
            return this.controller.delete(req, res, id);
        });
    }

    /**
     * logging path that have created.
     * 
     * @private
     * @param {string} action action of the path :)
     * @param {string} path path of the action :)
     */
    _log_create_log(action, path) {
        const logger = require("../apis/custom_logger").logger;
        logger.log("info", {
            "title": action,
            "url": path
        });
    }
}

module.exports = DefaultRoute;