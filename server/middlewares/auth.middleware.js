/* global process*/
import jwt from 'jsonwebtoken';

const AuthMiddleWare = (req, res, next) => {
    const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!accessToken) {
        res.status(401).send({ message: 'No token provided' });
    }
    if (accessToken) {
        jwt.verify(accessToken, `${process.env.JWT_SECRET}`, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(401).send({ message: 'Invalid token' });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).send({ message: 'Failed to authenticate' });
    }
};

export default AuthMiddleWare;
