const SpeakerModel = require("../models").speaker;
// const DefaultController = require("./default");
const respAPIs = require("../apis/response");


// console.log(new DefaultController(null, {
//     "apis": ["create", "list"]
// }));

module.exports = {
    create(req, res) {
        SpeakerModel.SpeakerCreator(req.body)
            .then((food) => res.status(201).send(food))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return SpeakerModel.SpeakerList(req.query.next)
            .then(foods => {
                const result = {
                    "complete": true,
                    "length": foods.length,
                    "list": foods
                };
                res.status(200).send(result);
            })
            .catch(error => {
                return respAPIs.set_400(res, error);
            });
    },
    retrieve(req, res) {
        return SpeakerModel.SpeakerRetrieve(req.params.fid)
            .then(speaker => {
                if (!speaker) {
                    return respAPIs.set_404(res, "Speaker");
                }
                res.status(200).send(speaker);
            }).catch(error => {
                if (error.name == "CastError") return respAPIs.set_400(res, "Invalid ID");
                return respAPIs.set_400(res, error);
            });
    },
    update(req, res) {
        req.body["updatedAt"] = new Date();
        return SpeakerModel.SpeakerUpdate(req.params.fid, req.body)
            .then((speaker) => {
                if (!speaker) {
                    return respAPIs.set_404(res, "Speaker");
                }
                return respAPIs.set_200(res, speaker);
            })
            .catch((error) => {
                if (error.name == "CastError") return respAPIs.set_400(res, "Invalid ID");
                return respAPIs.set_400(res, error);
            });
    },
    destroy(req, res) {
        return SpeakerModel.SpeakerDestroyer(req.params.fid)
            .then(() => {
                return respAPIs.set_204(res);
            })
            .catch((error) => {
                if (error.name == "CastError") return respAPIs.set_400(res, "Invalid ID");
                return respAPIs.set_400(res, error);
            });
    }
};