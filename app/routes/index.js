const api_path_v1 = "/api/v1/";
const speakerController = require("../controllers").speaker;

module.exports = (app) => {
    /**
     * @api {get} /api/v1/ get welcome page
     * @apiVersion 0.0.1
     * @apiName Welcome
     *
     * @apiSuccess {String} message Welcome message
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Welcome to the TEDxKasetsart API! version 1"
     *     }
     */
    app.get(api_path_v1, (req, res) => res.status(200).send({
        message: "Welcome to the TEDxKasetsart API! version 1",
    }));

    app.post(api_path_v1 + "speaker/create", speakerController.create);
    app.get(api_path_v1 + "speakers", speakerController.list);
    app.get(api_path_v1 + "speaker/:fid", speakerController.retrieve);
    app.put(api_path_v1 + "speaker/:fid", speakerController.update);
    app.delete(api_path_v1 + "speaker/:fid", speakerController.destroy);
};