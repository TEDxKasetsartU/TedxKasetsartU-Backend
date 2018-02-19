/**
 * @apiDefine Response
 * @apiSuccess {Object} response Response JSON Object.
 * @apiSuccess {Boolean} response.complete complete flag.
 * @apiSuccess {Object} response.result result of the query.
 */

/**
 * @apiDefine NotExist
 * @apiError NotExist The <code>id</code> is not exist in database.
 * @apiErrorExample {json} Error-NotFound:
     HTTP/1.1 404 Not Found
     {
        "complete": false,
        "message": {
            "code": "NotFoundError",
            "message": ""
        }
     }
 */

/**
 * @apiDefine BadRequest
 * @apiError BadRequest The <code>parameter</code> or <code>body</code> is not follow structure.
 * @apiErrorExample {json} Error-BadRequest:
     HTTP/1.1 400 Bad Request
     {
        "complete": false,
        "message": {
            "message": "",
            "name": ""
        }
     }
 */

/**
 * @api {get} /api/v2/events List event.
 *
 * @apiName ListEvent
 * @apiGroup Event
 * @apiVersion 0.3.0
 *
 * @apiUse Response
 * @apiSuccess {Number} response.result.total total result, include the result that didn't response yet.
 * @apiSuccess {Object[]} response.result.list array of event object.
 * @apiSuccess {Number} response.result.length size of the return array.
 *
 */

/**
 * @api {get} /api/v2/event/:id Get event by ID.
 *
 * @apiName GetEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiParam {String} event unique ID.
 *
 * @apiUse Response
 * @apiSuccess {String} response.result._id model id.
 * @apiSuccess {Date} response.result.updatedAt last updated of the model.
 * @apiSuccess {Date} response.result.createdAt create date of the model.
 * @apiSuccess {Date} response.result.start_datetime start date and time of the event.
 * @apiSuccess {Date} response.result.end_datetime end date and time of the event.
 * @apiSuccess {Number} response.result.year event year.
 * @apiSuccess {String} response.result.concept unique ID of concept in Concept table.
 * @apiSuccess {String} response.result.location unique ID of location in Location table.
 * @apiSuccess {String} response.result.cover src of the cover image
 * @apiSuccess {String[]} response.result.speakers array of speakers ID.
 * @apiSuccess {String[]} response.result.volunteers array of volunteers ID.
 * @apiSuccess {String[]} response.result.partners array of partners ID.
 * @apiSuccess {Number} response.result.__v edit time, every edit action will increase this value by 1.
 *
 * @apiSuccessExample {json} Success-Response:
    {
        "complete": true,
        "result": [
            {
                "speakers": [],
                "partners": [],
                "volunteers": [],
                "_id": "id",
                "start_datetime": "2000-01-01T00:00:00.110Z",
                "end_datetime": "2000-01-01T00:00:00.111Z",
                "year": 2000,
                "cover": "images.jpeg",
                "location": "id",
                "concept": "id",
                "created_at": "2000-01-01T00:00:00.000Z",
                "updatedAt": "2000-01-01T00:00:00.000Z",
                "__v": 0
            }
        ]
    }
 *
 *
 * @apiUse NotExist
 * @apiUse BadRequest
 */

/**
 *
 * @api {get} /api/v2/events/years List years.
 *
 * @apiName ListEventYear
 * @apiGroup Event
 * @apiVersion  0.3.0
 *
 * @apiSuccess {Object} response Response JSON Object.
 * @apiSuccess {Boolean} response.complete complete flag.
 * @apiSuccess {String[]} response.result array of available years.
 *
 * @apiSuccessExample {json} Success-Response:
   {
        "complete": true,
        "result": [
            "2016",
            "2017"
        ]
    }
 */

/**
 *
 * @api {get} /api/v2/events/:year Get event by year.
 *
 * @apiName GetEventYear
 * @apiGroup Event
 * @apiVersion  0.3.0
 *
 * @apiParam  {Number} year filter year.
 *
 * @apiUse Response
 * @apiSuccess {String[]} response.result array of event in input year.
 *
 * @apiUse NotExist
 * @apiUse BadRequest
 */