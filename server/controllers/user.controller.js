/* global process*/

import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (username) => {
    var token = jwt.sign(
        {
            data: username,
            time: Date.now()
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: '1h' }
    );
    return token;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        await User.findOne({ email: email }).then((result) => {
            if (!result) {
                res.status(201).send('Unknown user');
                return;
            } else {
                const pass = result.checkPassword(password);

                if (pass !== true) {
                    res.status(201).send('Wrong password');
                    return;
                } else {
                    const token = generateToken(result.email);
                    res.status(200).send({ token: token });
                    return;
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error connecting to server' });
    }
};

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        await User.find({ email: req.body.email }).then((result) => {
            if (result.length > 0) {
                res.status(201).send('Duplicate username!');
            } else {
                var user = new User({
                    email: email,
                    password: password
                });
                user.save().then(() => {
                    res.status(200).send('Success');
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Error connecting to server' });
    }
};

const refresh = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            res.status(201).send('No TokenInformation');
            return;
        } else {
            const data = jwt.decode(token, `${process.env.JWT_SECRET}`);
            var different = Date.now() - data.time;

            if (different > data.exp - data.iat) {
                res.status(201).send('Token expired');
                return;
            } else {
                res.status(200).send(token);
                return;
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Error connecting to server' });
    }
};

export default { login, signUp, refresh };
