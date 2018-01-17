const serializeError = require("serialize-error");
const errors = require("restify-error");

const get_res = (complete, msg) => {
    let json = {
        "complete": complete
    };

    if (msg instanceof Error && !(msg instanceof errors.HttpError))
        msg = serializeError(msg);

    if (!complete) {
        if (msg) json["message"] = msg;
    } else {
        if (msg) json["result"] = msg;
    }
    return json;
};

const httpErrorMid = (res, msg) => {
    if (msg instanceof errors.HttpError) {
        res.status(msg.statusCode);
        res.send(get_res(false, msg.body));
        return true;
    } else {
        return false;
    }
};

const set = (res, code, obj) => {
    let comp = false;
    if (code < 400) comp = true;
    return res.status(code).send(get_res(comp, obj));
};

const set_200 = (res, obj) => {
    return set(res, 200, obj);
};

const set_201 = (res, obj) => {
    return set(res, 201, obj);
};

const set_204 = (res) => {
    return set(res, 204);
};

const set_404_custom = (res, msg) => {
    if (!httpErrorMid(res, msg))
        return set(res, 404, msg);
};

const set_404 = (res, obj) => {
    if (!httpErrorMid(res, obj))
        return set_404_custom(res, obj + " Not Found");
};

const set_400 = (res, msg) => {
    if (!httpErrorMid(res, msg))
        return set(res, 400, msg);
};

module.exports = {
    "set_200": set_200,
    "set_201": set_201,
    "set_204": set_204,
    "set_404": set_404,
    "set_404_custom": set_404_custom,
    "set_400": set_400
};