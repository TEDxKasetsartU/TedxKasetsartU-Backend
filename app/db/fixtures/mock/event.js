const random = (min = 1, max = 20) => {
    return Math.floor(Math.random() * max) + min;
};

const query = (model, size) => {
    const models = require("../../../settings").model;
    return models[model].random({}, {
        "_id": 1
    }, {
        "limit": size
    });
};

const get_dependent_tables = () => {
    return ["location", "speaker", "member", "banner"];
};

const exec = () => {
    const models = require("../../../settings").model;
    const event = models.event;
    const eventjson = require("./event-test.json");

    let promises = [];

    eventjson.forEach(async element => {
        try {
            element.locations = await query("location", random(1, 5));
            element.speakers = await query("speaker", random(5, 10));
            element.members = await query("member", random(10, 20));
            element.banners = await query("banner", random(10, 30));
            promises.push(event.create(element));
        } catch (err) {
            console.error("########");
            // promises.push(new Promise((res, rej) => {
            //     rej(err);
            // }));
        }
    });
    return Promise.all(promises);
};

module.exports = {
    dependent_table_name: get_dependent_tables,
    exec: exec
};