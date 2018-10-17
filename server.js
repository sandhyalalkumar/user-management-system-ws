const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 9000;
dbConfig = config.get("dbConfig");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(dbConfig.mongoUri)
    .then(function(){ console.log("Successfully connected to the database");})
    .catch(function(err){console.log('Could not connect to the database. Exiting now...'); process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "the secret stuff",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./app/routes/index.routes');
app.use("/", routes);

const UserAccount = require("./app/models/user.model");
passport.use(new LocalStrategy(UserAccount.authenticate()));
passport.serializeUser(UserAccount.serializeUser());
passport.deserializeUser(UserAccount.deserializeUser());

app.listen(port, function(){
    console.log("Server listening on port "+ port);
});

 