const Router = require('express').Router;
const sessionRouter = Router();
const { session } = require('passport');
const passport = require('passport');
const SessionController = require('../controller/session.controller');
const authenticate = require('../middlewares/auth');

sessionRouter.get('/', SessionController.getUsers);

sessionRouter.get('/current', authenticate, SessionController.currentUser);

sessionRouter.get("/registerError", SessionController.registerError);

sessionRouter.get("/loginError", SessionController.loginError);

sessionRouter.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/loginError",}), SessionController.login);

sessionRouter.get("/github", passport.authenticate("githubLogin", {}), (req, res)=>{});

sessionRouter.get("/githubError", SessionController.githubError);

sessionRouter.get("/githubCallback", passport.authenticate("githubLogin", {failureRedirect:"api/sessions/githubError"}), SessionController.githubCallback);

sessionRouter.get('/logout', SessionController.logout);


module.exports = sessionRouter;