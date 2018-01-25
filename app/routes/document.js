/**
 * @apiDefine MemberSuccess
 * @apiSuccess {String} response.result._id Member ID
 * @apiSuccess {Date} response.result.updatedAt Member last updated date
 * @apiSuccess {Date} response.result.createdAt Member created date
 * @apiSuccess {String} response.result.name Member name
 * @apiSuccess {String} response.result.position Member position
 * @apiSuccess {String} response.result.faculty Member faculty
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "complete": true,
 *          "result": {
 *              "_id": "5a69227e0227f61e9db18b3e",
 *              "updatedAt": "2018-01-25T00:19:11.379Z",
 *              "createdAt": "2018-01-25T00:19:11.379Z",
 *              "name": "Hermine Wrathall",
 *              "position": "Assistant Professor",
 *              "faculty": "Columbia College Hollywood",
 *              "__v": 0
 *          }
 *     }
 */

/**
 * @api {get} /api/v1/members List all Members
 * @apiName ListMember
 * @apiGroup Member
 *
 * @apiSuccess {Object} response Response JSON Object.
 * @apiSuccess {Boolean} response.complete complete flag.
 * @apiSuccess {Object} response.result result of the query
 * @apiSuccess {Number} response.result.total total result, include the result that didn't response yet.
 * @apiSuccess {Object[]} response.result.list list of member object 
 * @apiSuccess {Object} response.result.length list length/size
 * 
 * @apiVersion 0.2.0-beta.1
 */

/**
 * @api {get} /api/v1/member/:id Get Members
 * @apiName GetMember
 * @apiGroup Member
 * 
 * @apiParam {Number} id Member unique ID.
 *
 * @apiSuccess {Object} response Response JSON Object.
 * @apiSuccess {Boolean} response.complete complete flag.
 * @apiSuccess {Object} response.result result of the query
 * @apiUse MemberSuccess
 * 
 * @apiVersion 0.2.0-beta.1
 */