module.exports = (setting, prefix) => {
    const env = setting.env;
    const server_info = setting.server;

    const Route = setting.route.object;
    const EventRouter = server_info.express.Router();

    // setting.server.setting(EventRouter, setting);

    Route.create(EventRouter, prefix, new setting.controller.event(setting.model.event), {
        fixture: {
            load: env !== "test" && env !== "citest",
            clear: env === "develop" || env === "development" || env === "prod" || env === "production"
        },
        action: ["get", "list"],
        customs: [{
            name: "list_years",
            type: "list",
            method: "list_year",
            path: "/years"
        }, {
            name: "list_filter_year",
            type: "list",
            method: "list_by_year",
            path: "/:year"
        }]
    });
    return EventRouter;
};