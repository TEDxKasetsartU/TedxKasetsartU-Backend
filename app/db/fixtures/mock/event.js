const random = (min = 1, max = 20) => {
    return Math.floor(Math.random() * max) + min;
};

const query = (model, size) => {
    return new Promise((res, rej) => {
        const models = require("../../../models");
        models[model].random({}, {
            "_id": 1
        }, {
            "limit": random(1, 10)
        }).then((list) => {
            return res(list);
        }).catch(err => {
            return rej(err);
        });
    });
};

module.exports = () => {
    const eventjson = require("./event-test.json");

    let promises = [];

    eventjson.forEach(element => {
        promises.push(query("location", random())
            .then(result => {
                element.locations = result;
                return query("speaker", random());
            }).then(result => {
                element.speakers = result;
                return query("member", random());
            }).then(result => {
                element.members = result;
                return query("banner", random());
            }).then(result => {
                element.banners = result;
                return new Promise((res) => res(element));
            }).then(result => {
                return new Promise((res, rej) => {
                    return require("../../../models").event.clear_db().then(() => {
                        return res(result);
                    }).catch(err => {
                        rej(err);
                    });
                });
            }).then(result => {
                return require("../../../models").event.create(result);
            }).catch(err => {
                console.error(err);
            }));
    });

    return Promise.all(promises);
};