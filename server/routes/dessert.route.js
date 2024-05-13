import dessertCtr from '../controllers/dessert.controller.js';
import authMiddleWare from '../middlewares/auth.middleware.js';

const DessertRoter = (app) => {
    app.get('/getDessert', dessertCtr.getAll);
    app.post('/newAdd', authMiddleWare, dessertCtr.newAdd);
    app.post('/update', authMiddleWare, dessertCtr.update);
    app.post('/delete', authMiddleWare, dessertCtr.deleteData);
};

export default DessertRoter;
