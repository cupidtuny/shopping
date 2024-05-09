const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const data = jwt.decode(accessToken, "shhhh");

    if (data === null) {
        res.status(202).send("Above all, please login");
        return;
    } else if ((Date.now() - data.time) > (data.exp - data.iat)) {
        res.status(202).send("Token expired");
        return
    } else {
        next();
    }
}