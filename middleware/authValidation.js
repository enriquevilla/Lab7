const apiKey = "2abbf7c3-245b-404f-9473-ade729ed4653";

const authValidation = (req, res, next) => {
    if (!req.headers.authorization) {
        if (!req.query.apiKey) {
            if (!req.headers["book-api-key"]) {
                res.statusMessage = "Unauthorized, no API key sent";
                res.status(401).end();
            } else if (req.headers["book-api-key"] === apiKey) {
                next();
            } else {
                res.statusMessage = "Invalid authorization key";
                return res.status(401).end();
            }
        } else if (req.query.apiKey === apiKey) {
            next();
        } else {
            res.statusMessage = "Invalid authorization key";
            return res.status(401).end();
        }
    } else if (req.headers.authorization === `Bearer ${apiKey}`) {
        next();
    } else {
        res.statusMessage = "Invalid authorization key";
        return res.status(401).end();
    }
}

module.exports = authValidation;