/**
 * @api {get} / empty response
 * 
 * @apiName EmptyPage
 * @apiGroup Main
 * @apiVersion  0.3.0
 * 
 * @apiSuccess (200) {json} message empty page message
 * 
 * @apiSuccessExample  {json} Request-Example:
    {
        "complete": true,
        "result":"Empty page, learn more on document"
    }
 * 
 */

/**
 * 
 * @api {get} /version App version
 * 
 * @apiName GetVersion
 * @apiGroup Main
 * @apiVersion  0.3.0
 * 
 * @apiSuccess (200) {Object} response Response object
 * @apiSuccess (200) {Boolean} response.complete complete flag
 * @apiSuccess (200) {String} response.result version as string
 * 
 * @apiSuccessExample  {Object} Success-Example:
 * {
 *      "complete": true,
 *      "result": "0.3.0"
 * }
 * 
 */