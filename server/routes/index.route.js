import user from './user.route.js';
import dessert from './dessert.route.js';

const Router = (app) => {
    user(app), dessert(app);
};

export default Router;
