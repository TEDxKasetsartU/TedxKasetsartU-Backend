const random = (min = 1, max = 20) => {
    return Math.floor(Math.random() * max) + min;
};

const query = (model, size) => {
    return new Promise((res, rej) => {
        const models = require("../../../models");
        models[model].random({}, {
            "_id": 1
        }, {
            "limit": size
        }).then((list) => {
            return res(list);
        }).catch(err => {
            return rej(err);
        });
    });
};

module.exports = () => {
    const event = require("../../../models").event;
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
            console.error(err.message);
        }
    });
    return Promise.all(promises);
};