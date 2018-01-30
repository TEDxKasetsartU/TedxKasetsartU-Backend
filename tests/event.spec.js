/**
 * Get a random integer between `min` and `max`.
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 * @author https://gist.github.com/kerimdzhanov/7529623
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function randomEvent() {
    let event = null;

    /* eslint-disable no-empty */
    while (!event) {
        try {
            event = await settings.model.event.random();
        } catch (err) {}
    }
    /* eslint-enable no-empty */

    return event;
}

process.env.PORT = getRandomInt(5000, 40000);

const settings = require("../app/settings");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const {
    expect
} = require("chai");

chai.use(chaiHttp);

async function fixture_loader(model_name) {
    await settings.database.loader(settings.model[model_name]);
}

//Our parent block
describe("Events", () => {
    before(() => {
        this.server = require("../server");
        // await settings.model.event.clear_db();
    });

    describe("/GET event", () => {
        before(() => {
            setTimeout(async () => {
                await fixture_loader("event");
            }, 600000);
        });

        it("it should GET all the events", async () => {
            return chai.request(this.server)
                .get("/api/v2/events")
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res).to.have.status(200);
                });
        });

        it("it should GET 1 exist event", async () => {
            const event = await randomEvent();
            const res = await chai.request(this.server).get("/api/v2/event/" + event[0].id);

            expect(res.body.complete).to.be.true;
            expect(res).to.have.status(200);
        });

        it("it shouldn't GET no-exist event", async () => {
            return chai.request(this.server)
                .get("/api/v2/event/xxyyzz")
                .catch(err => {
                    expect(err.response.body.complete).to.be.false;
                    expect(err.response).to.have.status(400);
                });
        });
    });

    describe("/GET event year", () => {
        before(() => {
            setTimeout(async () => {
                await fixture_loader("event");
            }, 600000);
        });

        it("it should GET list all year available", async () => {
            return chai.request(this.server)
                .get("/api/v2/events/years")
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body.complete).to.be.true;
                    expect(res.body.result).to.be.an("array").that.not.empty;
                    expect(res).to.have.status(200);
                });
        });

        it("it should GET filter only input year", async () => {
            const event = await randomEvent();
            if (event) {
                const res = await chai.request(this.server).get("/api/v2/events/" + event[0].year);

                expect(res.body.complete).to.be.true;
                expect(res.body.result).to.be.an("array").that.not.be.empty;
                expect(res).to.have.status(200);
            }
        });

        it("it shouldn't GET not exist year", async () => {
            return chai.request(this.server)
                .get("/api/v2/events/1")
                .catch((err) => {
                    const res = err.response;
                    // console.log(res.body.message);
                    expect(res.body.complete).to.be.false;
                    expect(res.body.message).to.have.own.property("code");
                    expect(res).to.have.status(404);
                });
        });
    });
});