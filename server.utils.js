const addRouter = (app, setting) => {
    const apiv2 = "/api/v2"; // prefix, should be version of route
    const EventRouter = setting.router.event(setting, apiv2); // create router /* example stay on /app/routes/routers/event.js */
    app.use(apiv2, EventRouter); // apply router to main app

    // Add more router
};

module.exports = (setting) => {
    if (!setting || setting == {})
        setting = require("./app/settings");

    const listen_callback = () => {
        const Logger = setting.api.l.logger;
        require("colors");
        Logger.log("info", "RESTful API server started on: " + setting.server.port + " as '" + `${setting.env.green}` + "'");

        setting.model.default.is_connected().then(() => {
            Logger.log("info", {
                title: "connected",
                message: "Connect to database"
            });
        }).catch(() => {
            Logger.log("error", {
                title: "Connect loss",
                message: "Database connection is loss!!"
            });
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
    app.listen(setting.server.port, listen_callback);

    return app;
};