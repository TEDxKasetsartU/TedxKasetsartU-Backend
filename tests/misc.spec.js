const setup = require("./setup")();

// const settings = setup.get_setting();
const chai = setup.get_chai();
const expect = setup.get_expect();

//Our parent block
setTimeout(function() {
    describe("Misc.", function() {
        before(function() {
            this.server = setup.get_server();
            // return fixture_loader("event");
        });

        after(function() {
            return setup.close();
        });

        describe("/GET misc", function() {
            it("First page should exist", function() {
                return chai
                    .request(this.server)
                    .get("/")
                    .then(res => {
                        expect(res.body.complete).to.be.true;
                        expect(res).to.have.status(200);
                    });
            });

            it("Version page should exist", function() {
                return chai
                    .request(this.server)
                    .get("/version")
                    .then(res => {
                        expect(res.body.complete).to.be.true;
                        expect(res).to.have.status(200);
                    });
            });
        });

        run();
    });
}, 3000);
