const defaultCont = require("./default");

class EventController extends defaultCont {
    constructor(model) {
        super(model, {
            "apis": {
                "ignore": ["create", "update", "delete"]
            }
        });
    }

    list_by_year(request, response, dynamicPath = "year") {
        this.checkAPIsAllow(this.list)
            .then(() => {
                let opt = {};
                if (request.query.default_limit)
                    opt.default_limit = request.query.default_limit;
                if (request.params[dynamicPath])
                    opt.filter = {
                        "year": request.params[dynamicPath]
                    };
                return this.model.list(request.query.next, opt);
            }).then((result) => this.respAPIs.set_200(response, result))
            .catch((error) => this.respAPIs.set_400(response, error));
    }
}

module.exports = EventController;