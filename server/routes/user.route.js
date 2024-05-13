const userCtr = require('../controllers/user.controller');

module.exports = (app) => {
  app.post('/login', userCtr.login);
  app.post('/signup', userCtr.signUp);
  app.post('/refresh', userCtr.refresh);
};
