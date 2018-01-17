const respAPIs = require("../apis/response");

class DefaultController {

    get model_name() {
        return this.model.name;
    }

    constructor(model, options) {
        this.apis = {
            "create": true,
            "get": true,
            "list": true,
            "update": true,
            "delete": true
        };
        this.model = model;

        if (options && options.apis && options.apis.ignore)
            this.setAPIs(options.apis.ignore).catch((err) => {
                throw err;
            });
    }
    /**
     * set ignore/disable apis option
     * @private
     * @param {object} apis object that 
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

    defaultResponse(request, response) {
        respAPIs.set_200(response, "Empty page, learn more on document");
    }

    create(request, response) {
        this.checkAPIsAllow(this.create)
            .then(() => {
                return this.model.create(request.body);
            })
            .then((result) => respAPIs.set_201(response, result))
            .catch((error) => respAPIs.set_400(response, error));
    }

    update(request, response, dynamicPath = "fid") {
        this.checkAPIsAllow(this.update)
            .then(() => {
                return this.model.update(request.params[dynamicPath], request.body);
            }).then((result) => respAPIs.set_200(response, result))
            .catch((error) => respAPIs.set_400(response, error));
    }

    get(request, response, dynamicPath = "fid") {
        this.checkAPIsAllow(this.get)
            .then(() => {
                return this.model.retrieve(request.params[dynamicPath]);
            }).then((result) => respAPIs.set_200(response, result))
            .catch((error) => respAPIs.set_400(response, error));
    }

    list(request, response) {
        this.checkAPIsAllow(this.list)
            .then(() => {
                return this.model.list(request.query.next);
            })
            .then(models => {
                return this.model.count().then((total) => {
                    respAPIs.set_200(response, {
                        "total": total,
                        "list": models,
                        "length": models.length
                    });
                });
            })
            .catch(error => {
                return respAPIs.set_400(response, error);
            });
    }

    delete(request, response, dynamicPath = "fid") {
        this.checkAPIsAllow(this.delete)
            .then(() => {
                return this.model.delete(request.params[dynamicPath]);
            }).then(() => respAPIs.set_204(response))
            .catch((error) => respAPIs.set_400(response, error));
    }
}

module.exports = DefaultController;