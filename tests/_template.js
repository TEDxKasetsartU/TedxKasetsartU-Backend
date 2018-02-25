const setup = require("./setup")();

// const settings = setup.get_setting();
const chai = setup.get_chai();
const expect = setup.get_expect();

setTimeout(function() {
    describe("____", function() {
        before(function() {
            this.server = setup.get_server();
            // return setup.load_to_db("event");
        });

        after(function() {
            return setup.close();
        });

        describe("_____", function() {
            it("it should/shouldn't do something", function() {
                return chai
                    .request(this.server)
                    .get("/path/to/api")
                    .then(res => {
                        expect(res).to.have.status(200);
                    });
            });
        });

        run();
    });
}, 3000);
