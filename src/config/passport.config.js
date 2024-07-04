const passport = require('passport');
const local = require('passport-local');
const github = require('passport-github2').Strategy;
const UserManager = require('../dao/userManager');
const { userModel } = require("../dao/models/users.modelo");
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');


const userManager = new UserManager();

const passportConfig = () => {
  passport.use(
    "register",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        try {
          const { username, role } = req.body;

          if (!username || !email || !password) {
            return done(null, false, { message: "Username, email, and password are required" });
          }

          const userExists = await userManager.getUserByFilter({ email });
          if (userExists) {
            return done(null, false, { message: "User already exists" });
          }

          const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          const newUser = await userManager.addUser(username, email, hashedPassword, role);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

        passport.use(
          "githubLogin",
            new github(
              {
                clientID: "Iv1.f0301997906746ae",
                clientSecret: "cd7cdeab13c1ca88cfa661cf8b70aab096f6b16c",
                callbackURL:"http://localhost:8080/api/sessions/githubCallback",
              },
              async function(accessToken, refreshToken, profile, done){
                try{
                  let name = profile._json.username;
                  let email = profile._json.email;
                  let user = await userModel.findOne({email})
                  if(!user){
                    user = await userModel.create({name, email, profileGithub: profile})
                  }
                }
                catch(error){
                  return done(error);
                }
              }
            )
        )
    
      passport.use(
        "login",
        new local.Strategy(
          {
            usernameField: "email"
          },
          async (username, password, done) => {
            try {
              logger.info(`Login attempt for user ${username}`);           
              const user = await userManager.getUserByFilter({email: username });
              if (!user) {
                res.setHeader("Content-Type", "application/json");
                return res.status(401).json({error: "Credenciales incorrectas"});
              }
              
              const validatePassword=(user, password)=>bcrypt.compareSync(password, user.password)
              if (!validatePassword) {
                return done(null, false);
              }
    
              return done(null, user);
            } catch (error) {
              return done(error);
            }
          }
        )
      );
    
    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
            const user = await userManager.getUserByFilter({ _id: id });
            return done(null, user);
    });
}

module.exports = passportConfig;