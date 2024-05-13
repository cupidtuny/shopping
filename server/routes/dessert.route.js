const dessertCtr = require('../controllers/dessert.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

module.exports = (app) => {
  app.get('/getDessert', dessertCtr.getAll);
  app.post('/newAdd', authMiddleWare, dessertCtr.newAdd);
  app.post('/update', authMiddleWare, dessertCtr.update);
  app.post('/delete', authMiddleWare, dessertCtr.delete);
};
