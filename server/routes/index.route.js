const user = require('./user.route');
const dessert = require('./dessert.route');

module.exports = (app) => {
  user(app), dessert(app);
};
