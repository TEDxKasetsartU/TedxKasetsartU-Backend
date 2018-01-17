class DefaultRoute {
    constructor(expressApp, model, parameter = {}) {
        const DefController = require("../controllers/default");
        // if (!parameter.controller_options) parameter.controller_options = {};

        let defaultParameter = {
            "default_path": "/api",
            "version": "v1",
            "controller": new DefController(model, parameter.controller_options),
            "controller_options": {},
            "name": model.name.toLowerCase(),
            "pl_name": model.name.toLowerCase() + "s",
        };

        if (parameter.default_path) defaultParameter.default_path = parameter.default_path;
        if (parameter.version) defaultParameter.version = parameter.version;
        if (parameter.controller) defaultParameter.controller = new parameter.controller(model, parameter.controller_options);
        if (parameter.name) defaultParameter.name = parameter.name;
        if (parameter.pl_name) defaultParameter.pl_name = parameter.pl_name;

        this.express = expressApp;
        this.path = this.get_path(defaultParameter.default_path, defaultParameter.version);
        this.controller = defaultParameter.controller;
        this.name = defaultParameter.name;
        this.pl_name = defaultParameter.pl_name;
    }

    get_path(prefix, version) {
        // add / before prefix if not exist
        if (prefix != "" && prefix.charAt(0) != "/") prefix = "/" + prefix;
        return prefix + "/" + version + "/";
    }

    get_custom_path(name, custom = "") {
        if (custom && custom != "") custom = "/" + custom;
        return this.path + name + custom;
    }

    exec() {
        this.get_list();
        this.get_retrieve();
        this.post_create();
        this.put_update();
        this.delete_destroy();
        this.default_get();
    }

    default_get() {
        this.express.get("*", this.controller.defaultResponse);
    }

    get_list(custom = "") {
        this.express.get(this.get_custom_path(this.pl_name, custom), (req, res) => {
            return this.controller.list(req, res);
        });
    }

    get_retrieve(id = "fid") {
        this.express.get(this.get_custom_path(this.name, ":" + id), (req, res) => {
            return this.controller.get(req, res, id);
        });
    }

    post_create(custom = "") {
        this.express.post(this.get_custom_path(this.name, custom), (req, res) => {
            return this.controller.create(req, res);
        });
    }

    put_update(id = "fid") {
        this.express.put(this.get_custom_path(this.name, ":" + id), (req, res) => {
            return this.controller.update(req, res, id);
        });
    }

    delete_destroy(id = "fid") {
        this.express.delete(this.get_custom_path(this.name, ":" + id), (req, res) => {
            return this.controller.delete(req, res, id);
        });
    }
}

module.exports = DefaultRoute;