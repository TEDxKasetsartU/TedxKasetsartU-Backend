/**
 * Get a random integer between `min` and `max`.
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 * @author https://gist.github.com/kerimdzhanov/7529623
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEvent() {
    return settings
        .model
        .event
        .randomOne();
}

process.env.PORT = getRandomInt(4002, 19999);

const settings = require("../app/settings");

//Require the dev-dependencies
const chai = require("chai");
const {expect} = require("chai");

chai.use(require("chai-http"));

function fixture_loader(model_name) {
    return settings
        .database
        .loader
        .by_name(model_name);
}

function stop_fn() {
    for (const [key, _] of Object.entries(settings.model)) {
        if (key !== "default" && key !== "mongoose" && key !== "Schema") {
            settings.model[key].clear_db();
        }
    }
}

//Our parent block
setTimeout(function () {
    describe("Events", function () {
        before(function () {
            // console.log(Object.keys(this));
            this.server = require("../server.utils")(settings);
            return fixture_loader("event");
        });

        after(stop_fn);

        describe("/GET event", function () {
            it("it should GET all the events", function () {
                return chai
                    .request(this.server)
                    .get("/api/v3/events")
                    .then(res => {
                        // console.log(res.body);
                        expect(res.body.complete).to.be.true;
                        expect(res)
                            .to
                            .have
                            .status(200);
                    });
            });

            it("it shouldn't GET no-exist event", function () {
                return chai
                    .request(this.server)
                    .get("/api/v3/event/xxyyzz")
                    .catch(err => {
                        expect(err.response.body.complete).to.be.false;
                        expect(err.response)
                            .to
                            .have
                            .status(400);
                    });
            });

            it("it should GET list all year available", function () {
                return chai
                    .request(this.server)
                    .get("/api/v3/events/years")
                    .then(res => {
                        // console.log(res.body);
                        expect(res.body.complete).to.be.true;
                        expect(res.body.result)
                            .to
                            .be
                            .an("array")
                            .that
                            .not
                            .empty;
                        expect(res)
                            .to
                            .have
                            .status(200);
                    });
            });

            it("it should GET 1 exist event", function () {
                return randomEvent().then((event) => {
                    return chai
                        .request(this.server)
                        .get("/api/v3/event/" + event.id);
                }).then(res => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res)
                        .to
                        .have
                        .status(200);
                });
            });
        });

        describe("/GET year", function () {
            it("it shouldn't GET not exist year", function () {
                return chai
                    .request(this.server)
                    .get("/api/v3/events/1")
                    .catch(err => {
                        const res = err.response;
                        expect(res.body.complete).to.be.false;
                        expect(res.body.message)
                            .to
                            .have
                            .own
                            .property("code");
                        expect(res)
                            .to
                            .have
                            .status(404);
                    });
            });

            it("it should GET filter only input year", function () {
                return randomEvent().then((event) => {
                    return chai
                        .request(this.server)
                        .get("/api/v3/events/" + event.year);
                }).then(res => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res.body.result)
                        .to
                        .be
                        .an("array")
                        .that
                        .not
                        .be
                        .empty;
                    expect(res)
                        .to
                        .have
                        .status(200);
                });
            });
        });
        run();
    });
}, 3000);