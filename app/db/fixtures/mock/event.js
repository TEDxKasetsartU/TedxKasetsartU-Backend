const random = (min = 1, max = 20) => {
    return Math.floor(Math.random() * max) + min;
};

const query = (model, size) => {
    return new Promise((res, rej) => {
        const models = require("../../../settings").model;
        models[model].random({}, {
            "_id": 1
        }, {"limit": size}).then((list) => {
            if (list.length == 1) 
                return res({name: model, result: list[0]});
            else 
                return res({
                    name: model + "s",
                    result: list
                });
        }
        ).catch(err => {
            return rej(err);
        });
    });
};

const get_dependent_tables = () => {
    return [
        {
            name: "location",
            setting: {
                size: {
                    start: 1,
                    end: 1
                }
            }
        }, {
            name: "volunteer",
            setting: {
                size: {
                    start: 5,
                    end: 20
                }
            }
        }, {
            name: "speaker",
            setting: {
                size: {
                    start: 5,
                    end: 20
                }
            }
        }, {
            name: "concept",
            setting: {
                size: {
                    start: 1,
                    end: 1
                }
            }
        }, {
            name: "partner",
            setting: {
                size: {
                    start: 10,
                    end: 30
                }
            }
        }
    ];
};

const load_dependent_tables = (settings) => {
    const promises = [];
    get_dependent_tables().forEach(obj => promises.push(settings.database.loader.by_name(obj.name)));
    return Promise.all(promises);
};

const exec = () => {
    const settings = require("../../../settings");
    const models = settings.model;
    const event = models.event;
    const event_json = require("./event-test.json");
    let promises = [];

    return load_dependent_tables(settings).then(() => {
        event_json.forEach(async element => {
            try {
                let load_promises = get_dependent_tables().map(obj => query(obj.name, random(obj.setting.size.start, obj.setting.size.end)));
                promises.push(Promise.all(load_promises).then((result) => {
                    let obj = element;
                    result.forEach(e => {
                        obj[e.name] = e.result;
                    });
                    return event.create(obj);
                }));
            } catch (err) {
                promises.push(new Promise((res, rej) => {
                    rej(err);
                }));
            }
        });

        return Promise.all(promises);
    });
};

module.exports = {
    exec: exec
};