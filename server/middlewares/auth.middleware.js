const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(accessToken, `${process.env.JWT_SECRET}`, function (err) {
    if (err) {
      res.status(401).send('Invalid token');
    } else {
      next();
    }
  });
};
