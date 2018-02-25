function randomEvent() {
    return settings.model.event.randomOne();
}

const setup = require("./setup")();

const settings = setup.get_setting();
const chai = setup.get_chai();
const expect = setup.get_expect();

//Our parent block
setTimeout(function() {
    describe("Events", function() {
        before(function() {
            this.server = setup.get_server();
            return setup.load_to_db("event");
        });

        after(function() {
            return setup.close();
        });

        describe("/GET event", function() {
            it("it should GET all the events", function() {
                return chai
                    .request(this.server)
                    .get("/api/v3/events")
                    .then(res => {
                        // console.log(res.body);
                        expect(res.body.complete).to.be.true;
                        expect(res).to.have.status(200);
                    });
            });

            it("it should GET event, add default_limit option", function() {
                return chai
                    .request(this.server)
                    .get("/api/v3/events?default_limit=3")
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body.result).to.have.property("list");
                        expect(res.body.result).to.have.property("length");

                        expect(res.body.result.list).to.be.an("array");

                        expect(res.body.result.list.length).to.equal(
                            res.body.result.length
                        );

                        // console.log(res);

                        // expect(err.response.body.complete).to.be.false;
                    });
            });

            it("it shouldn't GET no-exist event", function() {
                return chai
                    .request(this.server)
                    .get("/api/v3/event/xxyyzz")
                    .catch(err => {
                        expect(err.response.body.complete).to.be.false;
                        expect(err.response).to.have.status(400);
                    });
            });

            it("it should GET list all year available", function() {
                return chai
                    .request(this.server)
                    .get("/api/v3/events/years")
                    .then(res => {
                        // console.log(res.body);
                        expect(res.body.complete).to.be.true;
                        expect(res.body.result).to.be.an("array").that.not
                            .empty;
                        expect(res).to.have.status(200);
                    });
            });

            it("it should GET 1 exist event", function() {
                return randomEvent()
                    .then(event => {
                        return chai
                            .request(this.server)
                            .get("/api/v3/event/" + event.id);
                    })
                    .then(res => {
                        // console.log(res.body);
                        expect(res.body.complete).to.be.true;
                        expect(res).to.have.status(200);
                    });
            });
        });

        describe("/GET year", function() {
            it("it shouldn't GET not exist year", function() {
                return chai
                    .request(this.server)
                    .get("/api/v3/events/1")
                    .catch(err => {
                        const res = err.response;
                        expect(res.body.complete).to.be.false;
                        expect(res.body.message).to.have.own.property("code");
                        expect(res).to.have.status(404);
                    });
            });

            it("it should GET filter only input year", function() {
                return randomEvent()
                    .then(event => {
                        return chai
                            .request(this.server)
                            .get("/api/v3/events/" + event.year);
                    })
                    .then(res => {
                        // console.log(res.body);
                        expect(res.body.complete).to.be.true;
                        expect(res.body.result).to.be.an("array").that.not.be
                            .empty;
                        expect(res).to.have.status(200);
                    });
            });
        });
        run();
    });
}, 3000);
