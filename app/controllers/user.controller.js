const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require("config");
const UserAccount = require('../models/user.model');

register = function(req, res) {
    UserAccount.register(new UserAccount({
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        username : req.body.username 
        }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            res.status(500).send({message: "can't register user, internal server error"});
        }
        passport.authenticate('local')(req, res, function () {
            res.status(200).send({message: "user registered successfully"});
        });
    });
}

profile = function(req, res) {
    UserAccount.findById(req.params.userId)
    .then(function(user){
        if(!user){
            res.status(404).send({
                message: "user not found with id"+req.params.userId
            });
        }
        res.status(200).send(user);
    })
    .catch(function(err){
        if(err.kind == "ObjectId"){
            return res.status(404).send({
                message: "user not found with id "+req.params.userId
            });
        }
        return res.status(500).send({
            message: "error retrieving user with id "+req.params.userId
        });
    })    
}

profileByUserName = function(req, res){
    UserAccount.findOne({username: req.params.username})
    .then(function(user){
        if(!user){0
            res.status(404).send({ message: "user not found with username "+req.params.username });
        }
        res.status(200).send(user);
    })
    .catch(function(err){
        if(err.kind == "ObjectId"){
            res.status(404).send({ message: "user not found with username "+req.params.username });
        }
        res.status(500).send({ message: "error retrieving user with username "+req.params.username });
    })    
};

login = function(req, res) {
    UserAccount.findOne({username: req.body.username})
    .then(function(user){
        if(!user){
            res.status(404).send({ message: "user not found with username "+req.params.username });
        }
        const secret = config.get("secretKey");
        const token = jwt.sign({id: user._id, username: user.username, email: user.email}, secret, { expiresIn: 86400, algorithm: "HS512"})
        res.status(200).send({auth: true, token: token});
    })
    .catch(function(err){
        if(err.kind == "ObjectId"){
            res.status(404).send({ message: "user not found with username "+req.params.username });
        }
        res.status(500).send({ message: "error retrieving user with username "+req.params.username });
    })
};

module.exports = {
    register: register,
    profile: profile,
    profileByUserName: profileByUserName,
    login: login
}