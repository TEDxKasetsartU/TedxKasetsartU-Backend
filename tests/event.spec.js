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
    return settings.model.event.count().then(res => {
        // console.log("event size: " + res);
        return settings.model.event.randomOne();
    });
}

process.env.PORT = getRandomInt(4002, 19999);

const settings = require("../app/settings");

//Require the dev-dependencies
const chai = require("chai");
const {
    expect
} = require("chai");

chai.use(require("chai-http"));

function fixture_loader(model_name) {
    return settings.database.loader.by_name(model_name);
}

//Our parent block
describe("Events", () => {
    before(() => {
        this.server = require("../server");
        return fixture_loader("event");
    });

    after(() => {
        return Promise.all([
            settings.model.event.clear_db(),
            settings.model.speaker.clear_db(),
            settings.model.member.clear_db(),
            settings.model.location.clear_db(),
            settings.model.banner.clear_db()
        ]);
    });

    describe("/GET event", () => {
        it("it should GET all the events", () => {
            return chai.request(this.server).get("/api/v2/events")
                .then(res => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res).to.have.status(200);
                });
        });

        it("it should GET 1 exist event", () => {
            return randomEvent()
                .then((event) => {
                    return chai.request(this.server).get("/api/v2/event/" + event.id);
                }).then(res => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res).to.have.status(200);
                });
        });

        it("it shouldn't GET no-exist event", () => {
            return chai.request(this.server).get("/api/v2/event/xxyyzz")
                .catch(err => {
                    expect(err.response.body.complete).to.be.false;
                    expect(err.response).to.have.status(400);
                });
        });
    });

    describe("/GET event year", () => {
        it("it should GET list all year available", () => {
            return chai.request(this.server).get("/api/v2/events/years")
                .then(res => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res.body.result).to.be.an("array").that.not.empty;
                    expect(res).to.have.status(200);
                });
        });

        it("it should GET filter only input year", () => {
            return randomEvent().then((event) => {
                return chai.request(this.server).get("/api/v2/events/" + event.year);
            }).then(res => {
                // console.log(res.body);
                expect(res.body.complete).to.be.true;
                expect(res.body.result).to.be.an("array").that.not.be.empty;
                expect(res).to.have.status(200);
            });
        });

        it("it shouldn't GET not exist year", () => {
            return chai.request(this.server)
                .get("/api/v2/events/1")
                .catch(err => {
                    const res = err.response;
                    expect(res.body.complete).to.be.false;
                    expect(res.body.message).to.have.own.property("code");
                    expect(res).to.have.status(404);
                });
        });
    });
});