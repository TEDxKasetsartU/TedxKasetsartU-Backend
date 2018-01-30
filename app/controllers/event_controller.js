const defaultCont = require("./default");
const errors = require("restify-error");

class EventController extends defaultCont {
    constructor(model) {
        super(model);
    }

    async list_by_year(request, response, dynamicPath = "year") {
        let opt = {};
        if (request.query.default_limit)
            opt.default_limit = request.query.default_limit;
        if (request.params[dynamicPath])
            opt.filter = {
                "year": request.params[dynamicPath]
            };
        try {
            const result = await this.model.list(request.query.next, opt);
            if (result.length == 0) {
                this.respAPIs.set_404(response, new errors.NotFoundError("Year " + opt.filter.year + " is not exist"));
            } else {
                this.respAPIs.set_200(response, result);
            }
        } catch (err) {
            this.respAPIs.set_400(response, err);
        }
    }

    async list_year(request, response) {
        let opt = {};
        if (request.query.default_limit)
            opt.default_limit = request.query.default_limit;
        opt.only = "year -_id";

        try {
            const result = await this.model.list(request.query.next, opt);
            this.respAPIs.set_200(response, result.map(a => a.year));
        } catch (err) {
            this.respAPIs.set_400(response, err);
        }
    }
}

module.exports = EventController;