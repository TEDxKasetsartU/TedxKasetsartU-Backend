process.env.PORT = 8765;

const model = require("../app/models");

const Speaker = model.speaker;

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const {
    expect
} = require("chai");

chai.use(chaiHttp);

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

function createSpeaker(param) {
    return Speaker.create(param);
}

//Our parent block
describe("Speakers", () => {
    before(async() => {
        this.server = await require("../server");
    });

    describe("/GET speaker", () => {
        it("it should GET all the speakers", () => {
            return chai.request(this.server.app)
                .get("/api/v1/speakers")
                .then((res) => {
                    expect(res).to.have.status(200);
                });
        });

        it("it should GET indv speaker", () => {
            const name = "speaker" + getRandomInt(1, 500000);
            return createSpeaker({
                "name": name
            }).then(speaker => {
                return chai.request(this.server.app)
                    .get("/api/v1/speaker/" + speaker.id)
                    .then((res) => {
                        expect(res).to.have.status(200);
                    });
            });
        });

        it("GET not exist indv speaker", () => {
            return chai.request(this.server.app)
                .get("/api/v1/speaker/400")
                .catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });

    describe.skip("/POST speaker", () => {
        const correct_speaker = {
            name: "speaker" + getRandomInt(1, 500000)
        };

        it("create speaker (correctly)", () => {
            return chai.request(this.server.app)
                .post("/api/v1/speaker")
                .send(correct_speaker)
                .then((res) => {
                    console.log(res);

                    expect(res).to.have.status(201);
                });
        });
    });

    describe.skip("/PUT speaker", () => {
        const new_name = {
            name: "new_speaker" + getRandomInt(1, 500000)
        };

        it("update not exist speaker", () => {
            return chai.request(this.server.app)
                .put("/api/v1/speaker/500")
                .send(new_name)
                .catch((err) => {
                    expect(err).to.have.status(400);
                });
        });

        it("update exist speaker", () => {
            const name = "speaker" + getRandomInt(1, 500000);
            return createSpeaker({
                "name": name
            }).then((speaker) => {
                return chai.request(this.server.app)
                    .put("/api/v1/speaker/" + speaker.id)
                    .send(new_name)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.complete).to.be.true;
                        expect(res.body.result).to.have.property("_id");
                        expect(res.body.result._id).to.equal(speaker.id);
                        expect(res.body.result).to.have.property("name");
                        expect(res.body.result.name).to.equal(new_name.name);
                    });
            }).catch((err) => {
                throw err;
            });
        });
    });

    describe.skip("/DELETE speaker", () => {
        it("delete not exist speaker", () => {
            return chai.request(this.server.app)
                .delete("/api/v1/speaker/500")
                .catch((err) => {
                    expect(err).to.have.status(400);
                });
        });

        it("delete speaker", () => {
            const name = "speaker" + getRandomInt(1, 500000);
            return createSpeaker({
                "name": name
            }).then((speaker) => {
                return chai.request(this.server.app)
                    .delete("/api/v1/speaker/" + speaker.id)
                    .then((res) => {
                        expect(res).to.have.status(204);
                    });
            });
        });
    });
});