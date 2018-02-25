const addRouter = (app, setting) => {
    // const apiv2 = "/api/v2"; // prefix, should be version of route
    const api = "/api/v3";
    const EventRouter = setting.router.event(setting, api); // create router /* example stay on /app/routes/routers/event.js */
    app.use(api, EventRouter); // apply router to main app

    // Add more router
};

module.exports = setting => {
    if (!setting || setting == {}) setting = require("./app/settings");

    const listen_callback = () => {
        const Logger = setting.api.l;
        // require("colors");
        Logger.log.info({
            title: "Server started",
            message: "RESTful API have started",
            request: {
                name: "path",
                method: "GET, POST",
                url: ""
            }
        });

        setting.model.default
            .is_connected()
            .then(() => {
                Logger.utils.show_info("connected", "Connect to database");
            })
            .catch(() => {
                Logger.utils.show_info(
                    "connect loss",
                    "Database connection is loss!!"
                );
            });
    };
    // express app
    const app = setting.server.expressApp;
    // setup router
    setting.server.setting(app, setting);
    setting.route.object.default(app, setting);
    // add router
    addRouter(app, setting);
    // listen router
    const server = app.listen(setting.server.port, listen_callback);

    return { app: app, server: server };
};
