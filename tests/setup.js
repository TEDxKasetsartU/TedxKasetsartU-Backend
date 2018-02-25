let setup = null;

class Setup {
    constructor() {
        this.port = process.env.PORT = this.getRandomInt(4002, 19999);

        this.setting = require("../app/settings");
        this.server = require("../server.utils")(this.setting);

        this.chai = require("chai");
        const { expect } = require("chai");
        this.expect = expect;
        this.chai.use(require("chai-http"));

        // console.log("Run constructor EIEI");
    }

    close() {
        return this.clear_all_db().then(() => this.server.server.close());
    }

    /**
     * Get a random integer between `min` and `max`.
     * @param {number} min - min number
     * @param {number} max - max number
     * @return {number} a random integer
     * @author https://gist.github.com/kerimdzhanov/7529623
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    get_chai() {
        return this.chai;
    }

    get_expect() {
        return this.expect;
    }

    get_server() {
        return this.server.app;
    }

    get_setting() {
        return this.setting;
    }

    get_port() {
        return this.port;
    }

    load_to_db(name) {
        return this.setting.database.loader.by_name(name);
    }

    clear_db(name) {
        // console.log(name);
        return this.setting.model[name].clear_db();
    }

    clear_all_db() {
        const arr = Object.keys(this.setting.model).map(key => {
            if (key !== "default" && key !== "mongoose" && key !== "Schema") {
                return this.clear_db(key);
            }
        });

        return Promise.all(arr);
    }
}

module.exports = () => {
    if (setup == null) {
        // console.log("create setup because FUCK");
        setup = new Setup();
    }
    return setup;
};
