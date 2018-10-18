const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressJwt = require("express-jwt");
const localStrategy = require('passport-local').Strategy;
const routes = require('./app/routes/index.routes');
const blogRoutes = require("./app/routes/blog.routes");
const UserAccount = require("./app/models/user.model");

const app = express();
const port = process.env.PORT || 9000;
const dbConfig = config.get("dbConfig");
const secret = config.get("secretKey");

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
app.use(expressJwt({secret: secret}).unless({path: ['/login', '/register']}));
app.use("/", routes);
app.use("/", blogRoutes);

passport.use(new localStrategy(UserAccount.authenticate()));
passport.serializeUser(UserAccount.serializeUser());
passport.deserializeUser(UserAccount.deserializeUser());

app.listen(port, function(){
    console.log("Server listening on port "+ port);
});

 