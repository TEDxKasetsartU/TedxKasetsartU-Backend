/**
 * @class
 */
class DefaultController {
    get model_name() {
        return this.model.name;
    }

    get model_lower_name() {
        return this.model.low_name;
    }

    get model_plural_name() {
        return this.model.plural_name;
    }

    /**
     * @constructor
     * @param {Model} model database model
     * @param {Object[]} functions more action of controller
     */
    constructor(model, functions = []) {
        this.model = model;
        this.functions = functions;
        this.respAPIs = require("../apis/response");
    }

    async create(request, response) {
        try {
            const result = await this.model.create(request.body);
            this.respAPIs.set_201(response, result);
        } catch (err) {
            this.respAPIs.set_400(response, err);
        }
    }

    async list(request, response) {
        let opt = {};
        if (request.query.default_limit)
            opt.default_limit = request.query.default_limit;

        try {
            const models = await this.model.list(request.query.next, opt);
            const total = await this.model.count();

            this.respAPIs.set_200(response, {
                "total": total,
                "list": models,
                "length": models.length
            });
        } catch (err) {
            return this.respAPIs.set_400(response, err);
        }
    }

    async get(request, response, dynamicPath = "id") {
        try {
            const result = await this.model.retrieve(request.params[dynamicPath]);
            this.respAPIs.set_200(response, result);
        } catch (err) {
            this.respAPIs.set_400(response, err);
        }
    }

    async update(request, response, dynamicPath = "id") {
        try {
            const result = await this.model.update(request.params[dynamicPath], request.body);
            this.respAPIs.set_200(response, result);
        } catch (err) {
            this.respAPIs.set_400(response, err);
        }
    }

    async delete(request, response, dynamicPath = "id") {
        try {
            await this.model.delete(request.params[dynamicPath]);
            this.respAPIs.set_204(response);
        } catch (err) {
            this.respAPIs.set_400(response, err);
        }
    }
}

module.exports = DefaultController;