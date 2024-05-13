import userCtr from '../controllers/user.controller.js';

const UserRouter = (app) => {
    app.post('/login', userCtr.login);
    app.post('/signup', userCtr.signUp);
    app.post('/refresh', userCtr.refresh);
};

export default UserRouter;
