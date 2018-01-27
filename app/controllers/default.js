/** 
 * @class
 */
class DefaultController {

    get model_name() {
        return this.model.name;
    }

    /**
     * @constructor
     * @param {Model} model database model
     * @param {Object} options option of controller
     * @param {Object} options.apis api option
     * @param {string[]} options.apis.ignore ignore method, accept "create", "get", "list", "update", "delete"
     */
    constructor(model, options = {}) {
        this.apis = {
            "create": true,
            "get": true,
            "list": true,
            "update": true,
            "delete": true
        };
        this.model = model;
        this.respAPIs = require("../apis/response");

        if (options.apis && options.apis.ignore)
            this.setAPIs(options.apis.ignore).catch((err) => {
                throw err;
            });
    }
    /**
     * set ignore/disable apis option
     * @private
     * @param {Object} apis object that 
     * have accept key is "create", "get", "list", "update", "delete"
     */
    setAPIs(apis) {
        return new Promise((res, rej) => {
            apis.forEach(element => {
                if (this.apis[element] != true && this.apis[element] != false)
                    rej(new Error(element + " is invalid key"));

                this.apis[element] = false;
            });
            res();
        });
    }

    checkAPIsAllow(func) {
        return new Promise((res, rej) => {
            this.apis[func.name] ? res() : rej(new Error(func.name + " is not allow"));
        });
    }

    can_do(action) {
        return this.apis[action];
    }

    create(request, response) {
        this.checkAPIsAllow(this.create)
            .then(() => {
                return this.model.create(request.body);
            })
            .then((result) => this.respAPIs.set_201(response, result))
            .catch((error) => this.respAPIs.set_400(response, error));
    }

    update(request, response, dynamicPath = "fid") {
        this.checkAPIsAllow(this.update)
            .then(() => {
                return this.model.update(request.params[dynamicPath], request.body);
            }).then((result) => this.respAPIs.set_200(response, result))
            .catch((error) => this.respAPIs.set_400(response, error));
    }

    get(request, response, dynamicPath = "fid") {
        this.checkAPIsAllow(this.get)
            .then(() => {
                return this.model.retrieve(request.params[dynamicPath]);
            }).then((result) => this.respAPIs.set_200(response, result))
            .catch((error) => this.respAPIs.set_400(response, error));
    }

    list(request, response) {
        this.checkAPIsAllow(this.list)
            .then(() => {
                let opt = {};
                if (request.query.default_limit) {
                    opt.default_limit = request.query.default_limit;
                }
                return this.model.list(request.query.next, opt);
            })
            .then(models => {
                return this.model.count().then((total) => {
                    this.respAPIs.set_200(response, {
                        "total": total,
                        "list": models,
                        "length": models.length
                    });
                });
            })
            .catch(error => {
                return this.respAPIs.set_400(response, error);
            });
    }

    delete(request, response, dynamicPath = "fid") {
        this.checkAPIsAllow(this.delete)
            .then(() => {
                return this.model.delete(request.params[dynamicPath]);
            }).then(() => this.respAPIs.set_204(response))
            .catch((error) => this.respAPIs.set_400(response, error));
    }
}

module.exports = DefaultController;