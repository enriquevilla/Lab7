const {APIKEY} = require("../config");

const authValidation = (req, res, next) => {
    if (!req.headers.authorization) {
        if (!req.query.apiKey) {
            if (!req.headers["book-api-key"]) {
                res.statusMessage = "Unauthorized, no API key sent";
                res.status(401).end();
            } else if (req.headers["book-api-key"] === APIKEY) {
                next();
            } else {
                res.statusMessage = "Invalid authorization key";
                return res.status(401).end();
            }
        } else if (req.query.apiKey === APIKEY) {
            next();
        } else {
            res.statusMessage = "Invalid authorization key";
            return res.status(401).end();
        }
    } else if (req.headers.authorization === `Bearer ${APIKEY}`) {
        next();
    } else {
        res.statusMessage = "Invalid authorization key";
        return res.status(401).end();
    }
}

module.exports = authValidation;