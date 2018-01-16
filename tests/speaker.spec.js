process.env.PORT = 8765;

const model = require("../app/models");

const Speaker = model.speaker.Speaker;

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
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
    const speaker = new Speaker(param);
    return new Promise((res, rej) => {
        speaker.save((err, speaker) => {
            if (err) rej(err);
            res(speaker);
        });
    });
}

//Our parent block
describe("Speakers", () => {
    before(() => {

    });

    after((done) => {
        done();
    });

    /*
     * Test the /GET route
     */
    describe("/GET speaker", () => {
        it("it should GET all the speakers", () => {
            return chai.request(server.app)
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
                return chai.request(server.app)
                    .get("/api/v1/speaker/" + speaker.id)
                    .then((res) => {
                        expect(res).to.have.status(200);
                    });
            });
        });

        it("GET not exist indv speaker", () => {
            return chai.request(server.app)
                .get("/api/v1/speaker/400")
                .catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe("/POST speaker", () => {
        const correct_speaker = {
            name: "speaker" + getRandomInt(1, 500000)
        };
        // const missing_speaker = {
        //     title: "speaker" + getRandomInt(1, 500000)
        // };

        it("create speaker (correctly)", () => {
            return chai.request(server.app)
                .post("/api/v1/speaker/create")
                .send(correct_speaker)
                .then((res) => {
                    expect(res).to.have.status(201);
                });
        });

        // it("create speaker (wrong format)", (done) => {
        //     chai.request(server.app)
        //         .post("/api/v1/speaker/create")
        //         .send(missing_speaker)
        //         .then((res) => {
        //             expect(res).to.have.status(400);
        //             done();
        //         })
        //         .catch((err) => {
        //             expect(err).to.have.status(400);
        //             done();
        //         });
        // });
    });

    describe("/PUT speaker", () => {
        const new_name = {
            name: "new_speaker" + getRandomInt(1, 500000)
        };

        it("update not exist speaker", () => {
            return chai.request(server.app)
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
                return chai.request(server.app)
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

    describe("/DELETE speaker", () => {
        it("delete not exist speaker", () => {
            return chai.request(server.app)
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
                return chai.request(server.app)
                    .delete("/api/v1/speaker/" + speaker.id)
                    .then((res) => {
                        expect(res).to.have.status(204);
                    });
            });
        });
    });
});