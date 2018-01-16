class DefaultRoute {

    constructor(default_path = "/api", version = "v1", defaultController, expressApp) {
        this.path = default_path + "/" + version;
        this.controller = defaultController;

        this.express = expressApp;
    }
}

module.exports = DefaultRoute;